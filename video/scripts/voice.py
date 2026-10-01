import asyncio, sys, json, subprocess, wave
from pathlib import Path
import numpy as np
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tools'))
import edge_tts
import imageio_ffmpeg

SEGMENTS = [
    (0.2, 2.5, 'Знакомьтесь, Иван.', '+0%'),
    (2.8, 6.0, 'Мой AI-помощник для диагностики каналов.', '+4%'),
    (6.15, 13.0, 'Ему важна не красота, а ясность: кто вы, логика контента, что можно получить, доверие и готовность к автоматизации.', '+12%'),
    (13.1, 17.0, 'Потом появляется зона: красная, жёлтая, зелёная или синяя.', '+12%'),
    (17.1, 20.0, 'В жёлтой основа есть — пора связать детали.', '+8%'),
    (20.1, 24.7, 'Но настоящий Иван строже. На слово не верит.', '-3%'),
    (25.0, 27.8, 'Ему подавай доказательства.', '-8%'),
]
FF = imageio_ffmpeg.get_ffmpeg_exe()
async def main():
    target = ROOT / 'public/voice-v2'
    target.mkdir(exist_ok=True)
    combined = np.zeros(28 * 24000, dtype=np.float32)
    report = []
    for i, (start, end, text, rate) in enumerate(SEGMENTS):
        mp3 = target / f'{i}.mp3'
        if not mp3.exists() or mp3.stat().st_size == 0:
            await edge_tts.Communicate(text, 'ru-RU-DmitryNeural', rate=rate, pitch='+2Hz').save(str(mp3))
        raw = subprocess.check_output([str(FF), '-v', 'error', '-i', str(mp3), '-f', 'f32le', '-ac', '1', '-ar', '24000', '-'])
        data = np.frombuffer(raw, dtype=np.float32)
        active = np.where(np.abs(data) > .002)[0]
        if len(active): data = data[max(0, active[0]-1200):min(len(data), active[-1]+2400)]
        duration = len(data)/24000
        speed = max(1, duration/(end-start))
        if speed > 1.25: raise RuntimeError(f'Segment {i} too long: {duration:.2f}s, needs {speed:.2f}x')
        if speed > 1:
            raw = subprocess.check_output([str(FF), '-v', 'error', '-f', 'f32le', '-ar', '24000', '-ac', '1', '-i', '-', '-af', f'atempo={speed}', '-f', 'f32le', '-'], input=data.tobytes())
            data = np.frombuffer(raw, dtype=np.float32)
        offset = round(start*24000)
        combined[offset:offset+len(data)] += data
        report.append(dict(start=start, end=start+len(data)/24000, text=text, tempo=round(speed,3)))
        print(report[-1], flush=True)
    peak = np.max(np.abs(combined))
    if peak > 0: combined *= .87/peak
    with wave.open(str(ROOT/'public/ivan-voice.wav'), 'wb') as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(24000)
        f.writeframes((combined*32767).astype('<i2').tobytes())
    rms = np.sqrt(np.mean(combined.reshape(840,800)**2,axis=1))
    amplitude = np.clip(rms/.14,0,1)
    (ROOT/'src/voice-envelope.ts').write_text('export const voiceEnvelope = '+json.dumps([round(float(x),4) for x in amplitude])+';\n',encoding='utf8')
    (target/'timing.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
asyncio.run(main())
