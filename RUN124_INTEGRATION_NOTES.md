# Rashed AI Run124 — Live iPhone Presence Metrics

Scope is restricted to Rashed AI realtime voice/camera/multimodal/presence acceptance. Base is Run123. No Core or Media Generation changes.

## Concrete change
- Added a separate `run124-acceptance.html` live-device acceptance page.
- Measures device-open latency, camera FPS, camera frame-jitter p95, audio callback-jitter p95, local VAD detection, browser speech-start event latency, VAD-to-browser-speech-stopped latency, WebGL capability, renderer FPS, and sample rate.
- Receipt schema: `rashed-client-runtime-benchmark-v2`.
- Receipt contains aggregate numeric/boolean capability and timing data only.
- No upload path is implemented. No raw audio, video, transcript, image, landmark array, identity embedding, or biometric template is included in the receipt.

## Measurement boundaries
- `speech_start_event_ms` is explicitly the browser `SpeechSynthesisUtterance.onstart` event latency. It is **not** claimed as acoustic first-audio and is **not** a Chatterbox benchmark.
- `barge_vad_to_speech_stop_ms` is local VAD detection time to `speechSynthesis.speaking == false`. It is a client interruption proxy, not a neural TTS acoustic-stop benchmark.
- Neural faster-whisper WER/CER/RTF and Chatterbox first-audio/RTF remain dependent on legal local runtimes/weights and are not fabricated.
- LivePortrait remains gated until the face dependency path is license-clean for intended use; no InsightFace pretrained packs are admitted here.

## Verification
- JavaScript extracted from the new page passed `node --check` before commit.
- No paid API, subscription, cloud GPU, or paid storage was started.
- Cost: $0.00.
- No preview deployment was created from this branch.
- Owner governance/privacy unchanged.
