# Rashed AI Run123 — iPhone Voice/Presence Acceptance Receipt

Scope: realtime voice, camera, multimodal interaction, and realistic 3D presence acceptance only. No Rashed Core or Media Generation changes.

## Change

- Extended the iPhone/Safari acceptance page to emit a content-free `rashed-client-runtime-benchmark-v1` receipt.
- Added real client-side measurements for device-open latency, camera FPS, renderer FPS, VAD detection, browser first-audio latency, and speech-triggered barge-in cancellation latency.
- Added capability attestation for camera/microphone active state, WebGL2, AudioContext, sample rate, and WebRTC audio-processing settings exposed by the browser.
- Added direct handoff to the existing on-device Whisper quality page.
- Receipt export contains aggregate booleans/numbers and origin/timestamp only. It contains no raw audio/video/image, transcript, prompt/response text, landmarks, embeddings, or biometric templates.

## Verification

- JavaScript syntax: `node --check` PASS.
- Required acceptance markers: PASS (`getUserMedia`, `MediaRecorder`, `speechSynthesis`, WebGL2, receipt schema, camera/renderer FPS, first-audio and barge-in latency fields).
- Network upload surface check: PASS. The updated acceptance page contains no `fetch`, `XMLHttpRequest`, `WebSocket`, or `sendBeacon` upload path.
- Existing main branch remains unchanged; Run123 is isolated on branch `voice-presence-run123` and is merge-ready.

## Boundaries

- Browser `speechSynthesis` is used only to measure iPhone playback/start and barge-in behavior. It is not claimed as Chatterbox Multilingual V3 acceptance.
- The separate `whisper-local.html` browser benchmark remains distinct from the preferred self-hosted faster-whisper runtime; its results must not be relabeled as faster-whisper.
- Chatterbox Multilingual V3 neural first-audio/RTF, faster-whisper WER/CER/RTF, GPU/VRAM neural load, true VRM avatar render acceptance, and LivePortrait photoreal acceptance still require their corresponding legal runtime/assets and real hardware execution.
- LivePortrait remains blocked if the face dependency relies on non-cleared InsightFace pretrained packs.

## Cost / governance / privacy

Paid API/subscription/GPU cost: $0.00. No paid compute was started. No preview build was deployed from this branch. Owner governance/privacy is unchanged; no new owner policy or privacy rule was introduced.
