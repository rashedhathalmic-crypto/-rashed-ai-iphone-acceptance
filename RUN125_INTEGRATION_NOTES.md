# Rashed AI Run125 — Strict Live Presence Receipt Acceptance

Scope is restricted to Rashed AI realtime voice/camera/multimodal/presence acceptance. Base is Run124. No Core or Media Generation source changes.

## Concrete change
- Added `run125-receipt-validator.js`, a zero-dependency validator for `rashed-client-runtime-benchmark-v2` receipts emitted by the Run124 iPhone live-device page.
- Validates HTTPS origin, freshness, expected schema, boolean capabilities, sample-rate bounds, finite non-negative latency/FPS metrics, and plausible FPS ceilings.
- Rejects unknown fields and forbidden content-bearing fields such as audio, video, image, transcript, prompt/response text, landmarks, embeddings, biometrics, blobs, PCM/WAV/M4A/base64 payload fields.
- Explicitly returns `neural_acceptance:false` and `photoreal_acceptance:false`; a Safari/device receipt cannot satisfy faster-whisper, Chatterbox, VRM asset, or LivePortrait neural acceptance by itself.
- Added zero-dependency Node tests covering valid receipt acceptance, insecure origin rejection, stale receipt rejection, forbidden transcript rejection, implausible FPS rejection, insecure-context rejection, and the neural/photoreal fail-closed flags.

## Verification
- CI syntax check: PASS.
- Receipt validator tests: PASS after fixing a caught false-positive where substring matching incorrectly treated `secure_context` as a forbidden `text` field.
- Scope/privacy guard: PASS.
- The initial failing CI was preserved as evidence; the defect was fixed rather than ignored.

## Measurement boundaries
- Run124 browser speech timing remains a browser event/client interruption proxy, not Chatterbox first-audio or acoustic-stop acceptance.
- faster-whisper Arabic/English WER/CER/RTF remains unclaimed until a legal local runtime and weights are actually executed.
- Chatterbox Multilingual V3 first-audio/RTF/resource metrics remain unclaimed until legal local runtime/weights are actually executed.
- LivePortrait remains gated if the face dependency path relies on uncleared InsightFace pretrained packs.
- VRM/WebGL rendered FPS requires a real renderer/avatar asset path; generic WebGL FPS alone is not relabeled as VRM acceptance.

## Cost / governance / privacy
- Paid API/subscription/GPU/storage cost: $0.00.
- No paid compute or external neural service was started.
- No preview build was deployed.
- Owner governance/privacy unchanged.
