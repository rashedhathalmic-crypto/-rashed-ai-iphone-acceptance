(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.RashedPresenceReceipt=factory()})(this,function(){
'use strict';
const SCHEMA='rashed-client-runtime-benchmark-v2';
const ALLOWED_TOP=new Set(['schema','created_at','origin','capabilities','metrics','measurement_notes']);
const CAP_KEYS=new Set(['secure_context','camera','microphone','webgl2','sample_rate']);
const METRIC_KEYS=new Set(['device_open_ms','camera_fps','camera_frame_jitter_p95_ms','audio_callback_jitter_p95_ms','vad_detected','speech_start_event_ms','barge_vad_to_speech_stop_ms','renderer_fps']);
const FORBIDDEN_EXACT=new Set(['audio','video','image','frame_data','transcript','text','prompt','response','landmark','landmarks','embedding','embeddings','biometric','biometrics','blob','base64','pcm','wav','m4a']);
function finiteOrNull(v){return v===null||(typeof v==='number'&&Number.isFinite(v)&&v>=0)}
function rejectUnknown(obj,allowed,label){if(!obj||typeof obj!=='object'||Array.isArray(obj))throw new Error(label+' must be object');for(const k of Object.keys(obj)){if(!allowed.has(k))throw new Error('unknown '+label+' field: '+k);if(FORBIDDEN_EXACT.has(k.toLowerCase()))throw new Error('forbidden content field: '+k)}}
function rejectForbiddenDeep(obj,path='receipt'){if(obj===null||typeof obj!=='object')return;for(const [k,v] of Object.entries(obj)){if(FORBIDDEN_EXACT.has(k.toLowerCase()))throw new Error('forbidden content field: '+path+'.'+k);if(v&&typeof v==='object')rejectForbiddenDeep(v,path+'.'+k)}}
function validateReceipt(r,nowMs=Date.now()){
 if(!r||typeof r!=='object'||Array.isArray(r))return {ok:false,error:'receipt must be object'};
 try{
  rejectForbiddenDeep(r);
  rejectUnknown(r,ALLOWED_TOP,'top');
  if(r.schema!==SCHEMA)throw new Error('unsupported schema');
  const created=Date.parse(r.created_at);if(!Number.isFinite(created))throw new Error('invalid created_at');
  const age=nowMs-created;if(age< -60000||age>15*60*1000)throw new Error('stale or future receipt');
  const u=new URL(r.origin);if(u.protocol!=='https:')throw new Error('HTTPS origin required');
  rejectUnknown(r.capabilities,CAP_KEYS,'capabilities');
  for(const k of ['secure_context','camera','microphone','webgl2'])if(typeof r.capabilities[k]!=='boolean')throw new Error(k+' must be boolean');
  if(!r.capabilities.secure_context)throw new Error('secure_context false');
  if(!(r.capabilities.sample_rate===null||(Number.isFinite(r.capabilities.sample_rate)&&r.capabilities.sample_rate>=8000&&r.capabilities.sample_rate<=192000)))throw new Error('invalid sample_rate');
  rejectUnknown(r.metrics,METRIC_KEYS,'metrics');
  for(const k of ['device_open_ms','camera_fps','camera_frame_jitter_p95_ms','audio_callback_jitter_p95_ms','speech_start_event_ms','barge_vad_to_speech_stop_ms','renderer_fps'])if(!finiteOrNull(r.metrics[k]))throw new Error('invalid metric '+k);
  if(typeof r.metrics.vad_detected!=='boolean')throw new Error('vad_detected must be boolean');
  if(r.metrics.camera_fps!==null&&r.metrics.camera_fps>240)throw new Error('camera_fps implausible');
  if(r.metrics.renderer_fps!==null&&r.metrics.renderer_fps>240)throw new Error('renderer_fps implausible');
  const capabilityPass=r.capabilities.camera&&r.capabilities.microphone&&r.capabilities.secure_context;
  const measurementPass=r.metrics.device_open_ms!==null&&r.metrics.camera_fps!==null&&r.metrics.vad_detected&&r.metrics.renderer_fps!==null;
  return {ok:true,capability_pass:capabilityPass,measurement_pass:measurementPass,neural_acceptance:false,photoreal_acceptance:false};
 }catch(e){return {ok:false,error:e.message}}
}
return {SCHEMA,validateReceipt};
});
