(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isa=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isi)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="a"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="p"){processStatics(init.statics[b2]=b3.p,b4)
delete b3.p}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(c0,c1,c2,c3,c4){var g=0,f=g,e=c1[g],d
if(typeof e=="string")d=c1[++g]
else{d=e
e=c2}if(typeof d=="number"){f=d
d=c1[++g]}c0[c2]=c0[e]=d
var a0=[d]
d.$stubName=c2
c4.push(c2)
for(g++;g<c1.length;g++){d=c1[g]
if(typeof d!="function")break
if(!c3)d.$stubName=c1[++g]
a0.push(d)
if(d.$stubName){c0[d.$stubName]=d
c4.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=c1[g]
var a2=c1[g]
c1=c1.slice(++g)
var a3=c1[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=c1[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=c1[2]
if(typeof b3=="number")c1[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof c1[b4]=="number")c1[b4]=c1[b4]+b
b4++}for(var a1=0;a1<b2;a1++){c1[b4]=c1[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,c1,c3,c2,a4)
c0[c2].$getter=d
d.$getterStub=true
if(c3)c4.push(a2)
c0[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}var b6=c1.length>b5
if(b6){a0[0].$reflectable=1
a0[0].$reflectionInfo=c1
for(var a1=1;a1<a0.length;a1++){a0[a1].$reflectable=2
a0[a1].$reflectionInfo=c1}var b7=c3?init.mangledGlobalNames:init.mangledNames
var b8=c1[b5]
var b9=b8
if(a2)b7[a2]=b9
if(a7)b9+="="
else if(!a8)b9+=":"+(a5+b0)
b7[c2]=b9
a0[0].$reflectionName=b9
for(var a1=b5+1;a1<c1.length;a1++)c1[a1]=c1[a1]+b
a0[0].$metadataIndex=b5+1
if(b0)c0[b8+"*"]=a0[f]}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.dv"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.dv"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.dv(this,d,e,f,true,[],a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b9=function(){}
var dart=[["","",,H,{"^":"",ns:{"^":"a;a"}}],["","",,J,{"^":"",
dC:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cu:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.dB==null){H.mj()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(P.eK("Return interceptor for "+H.e(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cS()]
if(v!=null)return v
v=H.mr(a)
if(v!=null)return v
if(typeof a=="function")return C.U
y=Object.getPrototypeOf(a)
if(y==null)return C.C
if(y===Object.prototype)return C.C
if(typeof w=="function"){Object.defineProperty(w,$.$get$cS(),{value:C.u,enumerable:false,writable:true,configurable:true})
return C.u}return C.u},
i:{"^":"a;",
E:function(a,b){return a===b},
gv:function(a){return H.b1(a)},
j:["d_",function(a){return"Instance of '"+H.br(a)+"'"}],
b1:["cZ",function(a,b){H.k(b,"$iscQ")
throw H.c(P.el(a,b.gcn(),b.gct(),b.gco(),null))},null,"gcq",5,0,null,0],
gb4:function(a){return new H.bV(H.dA(a))},
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|ArrayBuffer|AudioListener|AudioParam|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTDescriptor|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMPoint|DOMPointReadOnly|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceAcceleration|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadButton|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBObjectStore|IDBObservation|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|Range|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPoint|SVGPreserveAspectRatio|SVGUnitTypes|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageBoundsPoint|VRStageParameters|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShaderPrecisionFormat|WebGLSync|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
iz:{"^":"i;",
j:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$isdt:1},
ed:{"^":"i;",
E:function(a,b){return null==b},
j:function(a){return"null"},
gv:function(a){return 0},
gb4:function(a){return C.ad},
b1:[function(a,b){return this.cZ(a,H.k(b,"$iscQ"))},null,"gcq",5,0,null,0],
$isz:1},
cT:{"^":"i;",
gv:function(a){return 0},
j:["d0",function(a){return String(a)}]},
jg:{"^":"cT;"},
bu:{"^":"cT;"},
bO:{"^":"cT;",
j:function(a){var z=a[$.$get$c1()]
if(z==null)return this.d0(a)
return"JavaScript function for "+H.e(J.bh(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isbl:1},
aZ:{"^":"i;$ti",
l:function(a,b){H.t(b,H.h(a,0))
if(!!a.fixed$length)H.N(P.A("add"))
a.push(b)},
b_:function(a,b){var z
H.p(b,"$isn",[H.h(a,0)],"$asn")
if(!!a.fixed$length)H.N(P.A("addAll"))
for(z=J.aT(b);z.q();)a.push(z.gB(z))},
cm:function(a,b,c){var z=H.h(a,0)
return new H.d_(a,H.f(b,{func:1,ret:c,args:[z]}),[z,c])},
U:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.i(z,y,H.e(a[y]))
return z.join(b)},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
cY:function(a,b,c){var z=a.length
if(b>z)throw H.c(P.aq(b,0,a.length,"start",null))
if(c<b||c>a.length)throw H.c(P.aq(c,b,a.length,"end",null))
if(b===c)return H.l([],[H.h(a,0)])
return H.l(a.slice(b,c),[H.h(a,0)])},
cV:function(a,b){if(!!a.immutable$list)H.N(P.A("sort"))
H.jJ(a,J.lR(),H.h(a,0))},
ae:function(a){return this.cV(a,null)},
j:function(a){return P.cR(a,"[","]")},
gA:function(a){return new J.hA(a,a.length,0,[H.h(a,0)])},
gv:function(a){return H.b1(a)},
gk:function(a){return a.length},
h:function(a,b){if(b>=a.length||b<0)throw H.c(H.aR(a,b))
return a[b]},
i:function(a,b,c){H.t(c,H.h(a,0))
if(!!a.immutable$list)H.N(P.A("indexed set"))
if(b>=a.length||b<0)throw H.c(H.aR(a,b))
a[b]=c},
$isv:1,
$asv:I.b9,
$isn:1,
$isd:1,
p:{
iy:function(a,b){return J.bL(H.l(a,[b]))},
bL:function(a){H.bd(a)
a.fixed$length=Array
return a},
nq:[function(a,b){return J.fZ(H.fK(a,"$isU"),H.fK(b,"$isU"))},"$2","lR",8,0,35]}},
nr:{"^":"aZ;$ti"},
hA:{"^":"a;a,b,c,0d,$ti",
sbt:function(a){this.d=H.t(a,H.h(this,0))},
gB:function(a){return this.d},
q:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.T(z))
x=this.c
if(x>=y){this.sbt(null)
return!1}this.sbt(z[x]);++this.c
return!0},
$isaY:1},
bM:{"^":"i;",
T:function(a,b){var z
H.fJ(b)
if(typeof b!=="number")throw H.c(H.ab(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gay(b)
if(this.gay(a)===z)return 0
if(this.gay(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gay:function(a){return a===0?1/a<0:a<0},
cF:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.c(P.A(""+a+".toInt()"))},
aw:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.c(P.A(""+a+".floor()"))},
ez:function(a,b){var z
if(b>20)throw H.c(P.aq(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gay(a))return"-"+z
return z},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
aB:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bP(a,b)},
w:function(a,b){return(a|0)===a?a/b|0:this.bP(a,b)},
bP:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(P.A("Result of truncating division is "+H.e(z)+": "+H.e(a)+" ~/ "+b))},
aX:function(a,b){var z
if(a>0)z=this.dW(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
dW:function(a,b){return b>31?0:a>>>b},
K:function(a,b){if(typeof b!=="number")throw H.c(H.ab(b))
return a<b},
J:function(a,b){if(typeof b!=="number")throw H.c(H.ab(b))
return a>b},
$isU:1,
$asU:function(){return[P.M]},
$isF:1,
$isM:1},
ec:{"^":"bM;",$isw:1},
eb:{"^":"bM;"},
bN:{"^":"i;",
c5:function(a,b){if(b<0)throw H.c(H.aR(a,b))
if(b>=a.length)H.N(H.aR(a,b))
return a.charCodeAt(b)},
al:function(a,b){if(b>=a.length)throw H.c(H.aR(a,b))
return a.charCodeAt(b)},
D:function(a,b){H.r(b)
if(typeof b!=="string")throw H.c(P.dR(b,null,null))
return a+b},
cW:function(a,b){var z=H.l(a.split(b),[P.b])
return z},
cX:function(a,b,c){var z
if(c>a.length)throw H.c(P.aq(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
bk:function(a,b){return this.cX(a,b,0)},
aA:function(a,b,c){H.P(c)
if(c==null)c=a.length
if(b<0)throw H.c(P.cc(b,null,null))
if(b>c)throw H.c(P.cc(b,null,null))
if(c>a.length)throw H.c(P.cc(c,null,null))
return a.substring(b,c)},
af:function(a,b){return this.aA(a,b,null)},
eB:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.al(z,0)===133){x=J.iB(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.c5(z,w)===133?J.iC(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
ee:function(a,b,c){if(c>a.length)throw H.c(P.aq(c,0,a.length,null,null))
return H.mA(a,b,c)},
T:function(a,b){var z
H.r(b)
if(typeof b!=="string")throw H.c(H.ab(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
j:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gk:function(a){return a.length},
h:function(a,b){if(b>=a.length||!1)throw H.c(H.aR(a,b))
return a[b]},
$isv:1,
$asv:I.b9,
$isU:1,
$asU:function(){return[P.b]},
$isjc:1,
$isb:1,
p:{
ee:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
iB:function(a,b){var z,y
for(z=a.length;b<z;){y=C.e.al(a,b)
if(y!==32&&y!==13&&!J.ee(y))break;++b}return b},
iC:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.e.c5(a,z)
if(y!==32&&y!==13&&!J.ee(y))break}return b}}}}],["","",,H,{"^":"",
jJ:function(a,b,c){H.p(a,"$isd",[c],"$asd")
H.f(b,{func:1,ret:P.w,args:[c,c]})
H.bT(a,0,J.aU(a)-1,b,c)},
bT:function(a,b,c,d,e){H.p(a,"$isd",[e],"$asd")
H.f(d,{func:1,ret:P.w,args:[e,e]})
if(c-b<=32)H.jI(a,b,c,d,e)
else H.jH(a,b,c,d,e)},
jI:function(a,b,c,d,e){var z,y,x,w,v
H.p(a,"$isd",[e],"$asd")
H.f(d,{func:1,ret:P.w,args:[e,e]})
for(z=b+1,y=J.bb(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.ad(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
jH:function(a,b,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
H.p(a,"$isd",[a2],"$asd")
H.f(a1,{func:1,ret:P.w,args:[a2,a2]})
z=C.b.w(a0-b+1,6)
y=b+z
x=a0-z
w=C.b.w(b+a0,2)
v=w-z
u=w+z
t=J.bb(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.ad(a1.$2(s,r),0)){n=r
r=s
s=n}if(J.ad(a1.$2(p,o),0)){n=o
o=p
p=n}if(J.ad(a1.$2(s,q),0)){n=q
q=s
s=n}if(J.ad(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.ad(a1.$2(s,p),0)){n=p
p=s
s=n}if(J.ad(a1.$2(q,p),0)){n=p
p=q
q=n}if(J.ad(a1.$2(r,o),0)){n=o
o=r
r=n}if(J.ad(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.ad(a1.$2(p,o),0)){n=o
o=p
p=n}t.i(a,y,s)
t.i(a,w,q)
t.i(a,x,o)
t.i(a,v,t.h(a,b))
t.i(a,u,t.h(a,a0))
m=b+1
l=a0-1
if(J.bE(a1.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=a1.$2(j,r)
if(i===0)continue
if(typeof i!=="number")return i.K()
if(i<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else for(;!0;){i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.J()
if(i>0){--l
continue}else{h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
l=h
m=g
break}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
e=a1.$2(j,r)
if(typeof e!=="number")return e.K()
if(e<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else{d=a1.$2(j,p)
if(typeof d!=="number")return d.J()
if(d>0)for(;!0;){i=a1.$2(t.h(a,l),p)
if(typeof i!=="number")return i.J()
if(i>0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.K()
h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}}}f=!1}c=m-1
t.i(a,b,t.h(a,c))
t.i(a,c,r)
c=l+1
t.i(a,a0,t.h(a,c))
t.i(a,c,p)
H.bT(a,b,m-2,a1,a2)
H.bT(a,l+2,a0,a1,a2)
if(f)return
if(m<y&&l>x){for(;J.bE(a1.$2(t.h(a,m),r),0);)++m
for(;J.bE(a1.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(a1.$2(j,r)===0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(a1.$2(j,p)===0)for(;!0;)if(a1.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.K()
h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}H.bT(a,m,l,a1,a2)}else H.bT(a,m,l,a1,a2)},
e2:{"^":"n;"},
cX:{"^":"e2;$ti",
gA:function(a){return new H.cY(this,this.gk(this),0,[H.mc(this,"cX",0)])}},
cY:{"^":"a;a,b,c,0d,$ti",
sa8:function(a){this.d=H.t(a,H.h(this,0))},
gB:function(a){return this.d},
q:function(){var z,y,x,w
z=this.a
y=J.bb(z)
x=y.gk(z)
if(this.b!==x)throw H.c(P.bj(z))
w=this.c
if(w>=x){this.sa8(null)
return!1}this.sa8(y.t(z,w));++this.c
return!0},
$isaY:1},
iS:{"^":"n;a,b,$ti",
gA:function(a){return new H.ej(J.aT(this.a),this.b,this.$ti)},
gk:function(a){return J.aU(this.a)},
$asn:function(a,b){return[b]},
p:{
iT:function(a,b,c,d){H.p(a,"$isn",[c],"$asn")
H.f(b,{func:1,ret:d,args:[c]})
return new H.i0(a,b,[c,d])}}},
i0:{"^":"iS;a,b,$ti"},
ej:{"^":"aY;0a,b,c,$ti",
sa8:function(a){this.a=H.t(a,H.h(this,1))},
q:function(){var z=this.b
if(z.q()){this.sa8(this.c.$1(z.gB(z)))
return!0}this.sa8(null)
return!1},
gB:function(a){return this.a},
$asaY:function(a,b){return[b]}},
d_:{"^":"cX;a,b,$ti",
gk:function(a){return J.aU(this.a)},
t:function(a,b){return this.b.$1(J.h8(this.a,b))},
$ascX:function(a,b){return[b]},
$asn:function(a,b){return[b]}},
c2:{"^":"a;$ti"},
d7:{"^":"a;a",
gv:function(a){var z=this._hashCode
if(z!=null)return z
z=536870911&664597*J.aS(this.a)
this._hashCode=z
return z},
j:function(a){return'Symbol("'+H.e(this.a)+'")'},
E:function(a,b){if(b==null)return!1
return b instanceof H.d7&&this.a==b.a},
$isb2:1}}],["","",,H,{"^":"",
fE:function(a){var z=J.C(a)
return!!z.$iscI||!!z.$isR||!!z.$isef||!!z.$isea||!!z.$isE||!!z.$isdc||!!z.$iseM}}],["","",,H,{"^":"",
cy:function(a){var z,y
z=H.r(init.mangledGlobalNames[a])
if(typeof z==="string")return z
y="minified:"+a
return y},
md:[function(a){return init.types[H.P(a)]},null,null,4,0,null,6],
mn:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.C(a).$isx},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bh(a)
if(typeof z!=="string")throw H.c(H.ab(a))
return z},
b1:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
jp:function(a,b){var z,y
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
if(3>=z.length)return H.m(z,3)
y=H.r(z[3])
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return},
jo:function(a){var z,y
if(typeof a!=="string")H.N(H.ab(a))
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return
z=parseFloat(a)
if(isNaN(z)){y=J.hs(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return}return z},
br:function(a){return H.ji(a)+H.cp(H.as(a),0,null)},
ji:function(a){var z,y,x,w,v,u,t,s,r
z=J.C(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.N||!!z.$isbu){u=C.y(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.cy(w.length>1&&C.e.al(w,0)===36?C.e.af(w,1):w)},
eo:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
jr:function(a){var z,y,x,w
z=H.l([],[P.w])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.T)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.c(H.ab(w))
if(w<=65535)C.a.l(z,w)
else if(w<=1114111){C.a.l(z,55296+(C.b.aX(w-65536,10)&1023))
C.a.l(z,56320+(w&1023))}else throw H.c(H.ab(w))}return H.eo(z)},
jq:function(a){var z,y,x
for(z=a.length,y=0;y<z;++y){x=a[y]
if(typeof x!=="number"||Math.floor(x)!==x)throw H.c(H.ab(x))
if(x<0)throw H.c(H.ab(x))
if(x>65535)return H.jr(a)}return H.eo(a)},
aD:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
jn:function(a){var z=H.aD(a).getFullYear()+0
return z},
jm:function(a){var z=H.aD(a).getMonth()+1
return z},
jl:function(a){var z=H.aD(a).getDate()+0
return z},
c8:function(a){var z=H.aD(a).getHours()+0
return z},
ca:function(a){var z=H.aD(a).getMinutes()+0
return z},
cb:function(a){var z=H.aD(a).getSeconds()+0
return z},
c9:function(a){var z=H.aD(a).getMilliseconds()+0
return z},
ep:function(a,b,c){var z,y,x
z={}
H.p(c,"$isD",[P.b,null],"$asD")
z.a=0
y=[]
x=[]
z.a=b.length
C.a.b_(y,b)
z.b=""
if(c!=null&&c.a!==0)c.u(0,new H.jk(z,x,y))
return J.hl(a,new H.iA(C.ab,""+"$"+z.a+z.b,0,y,x,0))},
jj:function(a,b){var z,y
z=b instanceof Array?b:P.c5(b,!0,null)
y=z.length
if(y===0){if(!!a.$0)return a.$0()}else if(y===1){if(!!a.$1)return a.$1(z[0])}else if(y===2){if(!!a.$2)return a.$2(z[0],z[1])}else if(y===3){if(!!a.$3)return a.$3(z[0],z[1],z[2])}else if(y===4){if(!!a.$4)return a.$4(z[0],z[1],z[2],z[3])}else if(y===5)if(!!a.$5)return a.$5(z[0],z[1],z[2],z[3],z[4])
return H.jh(a,z)},
jh:function(a,b){var z,y,x,w,v,u
z=b.length
y=a[""+"$"+z]
if(y==null){y=J.C(a)["call*"]
if(y==null)return H.ep(a,b,null)
x=H.eq(y)
w=x.d
v=w+x.e
if(x.f||w>z||v<z)return H.ep(a,b,null)
b=P.c5(b,!0,null)
for(u=z;u<v;++u)C.a.l(b,init.metadata[x.eg(0,u)])}return y.apply(a,b)},
a8:function(a){throw H.c(H.ab(a))},
m:function(a,b){if(a==null)J.aU(a)
throw H.c(H.aR(a,b))},
aR:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aV(!0,b,"index",null)
z=H.P(J.aU(a))
if(!(b<0)){if(typeof z!=="number")return H.a8(z)
y=b>=z}else y=!0
if(y)return P.H(b,a,"index",null,z)
return P.cc(b,"index",null)},
ab:function(a){return new P.aV(!0,a,null,null)},
c:function(a){var z
if(a==null)a=new P.d2()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.fQ})
z.name=""}else z.toString=H.fQ
return z},
fQ:[function(){return J.bh(this.dartException)},null,null,0,0,null],
N:function(a){throw H.c(a)},
T:function(a){throw H.c(P.bj(a))},
at:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.mD(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.aX(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cW(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.em(H.e(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$ew()
u=$.$get$ex()
t=$.$get$ey()
s=$.$get$ez()
r=$.$get$eD()
q=$.$get$eE()
p=$.$get$eB()
$.$get$eA()
o=$.$get$eG()
n=$.$get$eF()
m=v.N(y)
if(m!=null)return z.$1(H.cW(H.r(y),m))
else{m=u.N(y)
if(m!=null){m.method="call"
return z.$1(H.cW(H.r(y),m))}else{m=t.N(y)
if(m==null){m=s.N(y)
if(m==null){m=r.N(y)
if(m==null){m=q.N(y)
if(m==null){m=p.N(y)
if(m==null){m=s.N(y)
if(m==null){m=o.N(y)
if(m==null){m=n.N(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.em(H.r(y),m))}}return z.$1(new H.k_(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.er()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aV(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.er()
return a},
bc:function(a){var z
if(a==null)return new H.f4(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.f4(a)},
ma:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
mm:[function(a,b,c,d,e,f){H.k(a,"$isbl")
switch(H.P(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.c(P.e4("Unsupported number of arguments for wrapped closure"))},null,null,24,0,null,7,8,9,10,11,12],
b8:function(a,b){var z
H.P(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.mm)
a.$identity=z
return z},
hK:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.C(d).$isd){z.$reflectionInfo=d
x=H.eq(z).r}else x=d
w=e?Object.create(new H.jK().constructor.prototype):Object.create(new H.cJ(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.ae
if(typeof u!=="number")return u.D()
$.ae=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.dW(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.md,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.dU:H.cK
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.dW(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
hH:function(a,b,c,d){var z=H.cK
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dW:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.hJ(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.hH(y,!w,z,b)
if(y===0){w=$.ae
if(typeof w!=="number")return w.D()
$.ae=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.bi
if(v==null){v=H.c0("self")
$.bi=v}return new Function(w+H.e(v)+";return "+u+"."+H.e(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ae
if(typeof w!=="number")return w.D()
$.ae=w+1
t+=w
w="return function("+t+"){return this."
v=$.bi
if(v==null){v=H.c0("self")
$.bi=v}return new Function(w+H.e(v)+"."+H.e(z)+"("+t+");}")()},
hI:function(a,b,c,d){var z,y
z=H.cK
y=H.dU
switch(b?-1:a){case 0:throw H.c(H.jA("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hJ:function(a,b){var z,y,x,w,v,u,t,s
z=$.bi
if(z==null){z=H.c0("self")
$.bi=z}y=$.dT
if(y==null){y=H.c0("receiver")
$.dT=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hI(w,!u,x,b)
if(w===1){z="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
y=$.ae
if(typeof y!=="number")return y.D()
$.ae=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
y=$.ae
if(typeof y!=="number")return y.D()
$.ae=y+1
return new Function(z+y+"}")()},
dv:function(a,b,c,d,e,f,g){var z,y
z=J.bL(H.bd(b))
H.P(c)
y=!!J.C(d).$isd?J.bL(d):d
return H.hK(a,z,c,y,!!e,f,g)},
r:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.c(H.aa(a,"String"))},
dw:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.c(H.aa(a,"double"))},
fJ:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.c(H.aa(a,"num"))},
cq:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.c(H.aa(a,"bool"))},
P:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.c(H.aa(a,"int"))},
dD:function(a,b){throw H.c(H.aa(a,H.r(b).substring(3)))},
my:function(a,b){var z=J.bb(b)
throw H.c(H.dV(a,z.aA(b,3,z.gk(b))))},
k:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.C(a)[b])return a
H.dD(a,b)},
I:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.C(a)[b]
else z=!0
if(z)return a
H.my(a,b)},
fK:function(a,b){if(a==null)return a
if(typeof a==="string")return a
if(typeof a==="number")return a
if(J.C(a)[b])return a
H.dD(a,b)},
bd:function(a){if(a==null)return a
if(!!J.C(a).$isd)return a
throw H.c(H.aa(a,"List"))},
mq:function(a,b){var z
if(a==null)return a
z=J.C(a)
if(!!z.$isd)return a
if(z[b])return a
H.dD(a,b)},
dx:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.P(z)]
else return a.$S()}return},
ba:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.dx(J.C(a))
if(z==null)return!1
return H.fb(z,null,b,null)},
f:function(a,b){var z,y
if(a==null)return a
if($.dq)return a
$.dq=!0
try{if(H.ba(a,b))return a
z=H.bf(b)
y=H.aa(a,z)
throw H.c(y)}finally{$.dq=!1}},
bW:function(a,b){if(a!=null&&!H.du(a,b))H.N(H.aa(a,H.bf(b)))
return a},
fi:function(a){var z,y
z=J.C(a)
if(!!z.$isj){y=H.dx(z)
if(y!=null)return H.bf(y)
return"Closure"}return H.br(a)},
mB:function(a){throw H.c(new P.hS(H.r(a)))},
dz:function(a){return init.getIsolateTag(a)},
fp:function(a){return new H.bV(a)},
l:function(a,b){a.$ti=b
return a},
as:function(a){if(a==null)return
return a.$ti},
oA:function(a,b,c){return H.bg(a["$as"+H.e(c)],H.as(b))},
bD:function(a,b,c,d){var z
H.r(c)
H.P(d)
z=H.bg(a["$as"+H.e(c)],H.as(b))
return z==null?null:z[d]},
mc:function(a,b,c){var z
H.r(b)
H.P(c)
z=H.bg(a["$as"+H.e(b)],H.as(a))
return z==null?null:z[c]},
h:function(a,b){var z
H.P(b)
z=H.as(a)
return z==null?null:z[b]},
bf:function(a){return H.aP(a,null)},
aP:function(a,b){var z,y
H.p(b,"$isd",[P.b],"$asd")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.cy(a[0].builtin$cls)+H.cp(a,1,b)
if(typeof a=="function")return H.cy(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){H.P(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.m(b,y)
return H.e(b[y])}if('func' in a)return H.lQ(a,b)
if('futureOr' in a)return"FutureOr<"+H.aP("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
lQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.b]
H.p(b,"$isd",z,"$asd")
if("bounds" in a){y=a.bounds
if(b==null){b=H.l([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.l(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.m(b,r)
t=C.e.D(t,b[r])
q=y[u]
if(q!=null&&q!==P.a)t+=" extends "+H.aP(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.aP(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.aP(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.aP(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.m7(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.r(z[l])
n=n+m+H.aP(i[h],b)+(" "+H.e(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
cp:function(a,b,c){var z,y,x,w,v,u
H.p(c,"$isd",[P.b],"$asd")
if(a==null)return""
z=new P.ce("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aP(u,c)}return"<"+z.j(0)+">"},
dA:function(a){var z,y,x,w
z=J.C(a)
if(!!z.$isj){y=H.dx(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.as(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
bg:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aQ:function(a,b,c,d){var z,y
H.r(b)
H.bd(c)
H.r(d)
if(a==null)return!1
z=H.as(a)
y=J.C(a)
if(y[b]==null)return!1
return H.fm(H.bg(y[d],z),null,c,null)},
bX:function(a,b,c,d){H.r(b)
H.bd(c)
H.r(d)
if(a==null)return a
if(H.aQ(a,b,c,d))return a
throw H.c(H.dV(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.cp(c,0,null),init.mangledGlobalNames)))},
p:function(a,b,c,d){H.r(b)
H.bd(c)
H.r(d)
if(a==null)return a
if(H.aQ(a,b,c,d))return a
throw H.c(H.aa(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.cp(c,0,null),init.mangledGlobalNames)))},
m0:function(a,b,c,d,e){H.r(c)
H.r(d)
H.r(e)
if(!H.a1(a,null,b,null))H.mC("TypeError: "+H.e(c)+H.bf(a)+H.e(d)+H.bf(b)+H.e(e))},
mC:function(a){throw H.c(new H.eH(H.r(a)))},
fm:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.a1(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.a1(a[y],b,c[y],d))return!1
return!0},
oy:function(a,b,c){return a.apply(b,H.bg(J.C(b)["$as"+H.e(c)],H.as(b)))},
fF:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="a"||a.builtin$cls==="z"||a===-1||a===-2||H.fF(z)}return!1},
du:function(a,b){var z,y
if(a==null)return b==null||b.builtin$cls==="a"||b.builtin$cls==="z"||b===-1||b===-2||H.fF(b)
if(b==null||b===-1||b.builtin$cls==="a"||b===-2)return!0
if(typeof b=="object"){if('futureOr' in b)if(H.du(a,"type" in b?b.type:null))return!0
if('func' in b)return H.ba(a,b)}z=J.C(a).constructor
y=H.as(a)
if(y!=null){y=y.slice()
y.splice(0,0,z)
z=y}return H.a1(z,null,b,null)},
t:function(a,b){if(a!=null&&!H.du(a,b))throw H.c(H.aa(a,H.bf(b)))
return a},
a1:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="a"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="a"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.a1(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="z")return!0
if('func' in c)return H.fb(a,b,c,d)
if('func' in a)return c.builtin$cls==="bl"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.a1("type" in a?a.type:null,b,x,d)
else if(H.a1(a,b,x,d))return!0
else{if(!('$is'+"af" in y.prototype))return!1
w=y.prototype["$as"+"af"]
v=H.bg(w,z?a.slice(1):null)
return H.a1(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.fm(H.bg(r,z),b,u,d)},
fb:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.a1(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.a1(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.a1(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.a1(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.mx(m,b,l,d)},
mx:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.a1(c[w],d,a[w],b))return!1}return!0},
oz:function(a,b,c){Object.defineProperty(a,H.r(b),{value:c,enumerable:false,writable:true,configurable:true})},
mr:function(a){var z,y,x,w,v,u
z=H.r($.fC.$1(a))
y=$.cr[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cv[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.r($.fl.$2(a,z))
if(z!=null){y=$.cr[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cv[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cx(x)
$.cr[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cv[z]=x
return x}if(v==="-"){u=H.cx(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.fL(a,x)
if(v==="*")throw H.c(P.eK(z))
if(init.leafTags[z]===true){u=H.cx(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.fL(a,x)},
fL:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.dC(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cx:function(a){return J.dC(a,!1,null,!!a.$isx)},
mw:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.cx(z)
else return J.dC(z,c,null,null)},
mj:function(){if(!0===$.dB)return
$.dB=!0
H.mk()},
mk:function(){var z,y,x,w,v,u,t,s
$.cr=Object.create(null)
$.cv=Object.create(null)
H.mf()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.fM.$1(v)
if(u!=null){t=H.mw(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
mf:function(){var z,y,x,w,v,u,t
z=C.R()
z=H.b7(C.O,H.b7(C.T,H.b7(C.x,H.b7(C.x,H.b7(C.S,H.b7(C.P,H.b7(C.Q(C.y),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.fC=new H.mg(v)
$.fl=new H.mh(u)
$.fM=new H.mi(t)},
b7:function(a,b){return a(b)||b},
mA:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
hN:{"^":"k0;a,$ti"},
hM:{"^":"a;$ti",
j:function(a){return P.c7(this)},
$isD:1},
hO:{"^":"hM;a,b,c,$ti",
gk:function(a){return this.a},
M:function(a,b){return!1},
h:function(a,b){if(!this.M(0,b))return
return this.bF(b)},
bF:function(a){return this.b[H.r(a)]},
u:function(a,b){var z,y,x,w,v
z=H.h(this,1)
H.f(b,{func:1,ret:-1,args:[H.h(this,0),z]})
y=this.c
for(x=y.length,w=0;w<x;++w){v=y[w]
b.$2(v,H.t(this.bF(v),z))}}},
iA:{"^":"a;a,b,c,d,e,f",
gcn:function(){var z=this.a
return z},
gct:function(){var z,y,x,w
if(this.c===1)return C.z
z=this.d
y=z.length-this.e.length-this.f
if(y===0)return C.z
x=[]
for(w=0;w<y;++w){if(w>=z.length)return H.m(z,w)
x.push(z[w])}x.fixed$length=Array
x.immutable$list=Array
return x},
gco:function(){var z,y,x,w,v,u,t,s,r
if(this.c!==0)return C.A
z=this.e
y=z.length
x=this.d
w=x.length-y-this.f
if(y===0)return C.A
v=P.b2
u=new H.c4(0,0,[v,null])
for(t=0;t<y;++t){if(t>=z.length)return H.m(z,t)
s=z[t]
r=w+t
if(r<0||r>=x.length)return H.m(x,r)
u.i(0,new H.d7(s),x[r])}return new H.hN(u,[v,null])},
$iscQ:1},
jv:{"^":"a;a,b,c,d,e,f,r,0x",
eg:[function(a,b){var z
H.P(b)
z=this.d
if(typeof b!=="number")return b.K()
if(b<z)return
return this.b[3+b-z]},null,"geN",5,0,null,13],
p:{
eq:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.bL(z)
y=z[0]
x=z[1]
return new H.jv(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
jk:{"^":"j:17;a,b,c",
$2:function(a,b){var z
H.r(a)
z=this.a
z.b=z.b+"$"+H.e(a)
C.a.l(this.b,a)
C.a.l(this.c,b);++z.a}},
jU:{"^":"a;a,b,c,d,e,f",
N:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
p:{
ai:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.l([],[P.b])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.jU(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cg:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
eC:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
j3:{"^":"Q;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+z+"' on null"},
p:{
em:function(a,b){return new H.j3(a,b==null?null:b.method)}}},
iE:{"^":"Q;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.e(this.a)+")"},
p:{
cW:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.iE(a,y,z?null:b.receiver)}}},
k_:{"^":"Q;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
mD:{"^":"j:2;a",
$1:function(a){if(!!J.C(a).$isQ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
f4:{"^":"a;a,0b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isa_:1},
j:{"^":"a;",
j:function(a){return"Closure '"+H.br(this).trim()+"'"},
gcT:function(){return this},
$isbl:1,
gcT:function(){return this}},
ev:{"^":"j;"},
jK:{"^":"ev;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.cy(z)+"'"}},
cJ:{"^":"ev;a,b,c,d",
E:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cJ))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.b1(this.a)
else y=typeof z!=="object"?J.aS(z):H.b1(z)
return(y^H.b1(this.b))>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+("Instance of '"+H.br(z)+"'")},
p:{
cK:function(a){return a.a},
dU:function(a){return a.c},
c0:function(a){var z,y,x,w,v
z=new H.cJ("self","target","receiver","name")
y=J.bL(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
eH:{"^":"Q;a",
j:function(a){return this.a},
p:{
aa:function(a,b){return new H.eH("TypeError: "+H.e(P.aW(a))+": type '"+H.fi(a)+"' is not a subtype of type '"+b+"'")}}},
hF:{"^":"Q;a",
j:function(a){return this.a},
p:{
dV:function(a,b){return new H.hF("CastError: "+H.e(P.aW(a))+": type '"+H.fi(a)+"' is not a subtype of type '"+b+"'")}}},
jz:{"^":"Q;a",
j:function(a){return"RuntimeError: "+H.e(this.a)},
p:{
jA:function(a){return new H.jz(a)}}},
bV:{"^":"a;a,0b,0c,0d",
ga_:function(){var z=this.b
if(z==null){z=H.bf(this.a)
this.b=z}return z},
j:function(a){return this.ga_()},
gv:function(a){var z=this.d
if(z==null){z=C.e.gv(this.ga_())
this.d=z}return z},
E:function(a,b){if(b==null)return!1
return b instanceof H.bV&&this.ga_()===b.ga_()}},
c4:{"^":"cZ;a,0b,0c,0d,0e,0f,r,$ti",
gk:function(a){return this.a},
gG:function(a){return new H.a9(this,[H.h(this,0)])},
geC:function(a){var z=H.h(this,0)
return H.iT(new H.a9(this,[z]),new H.iD(this),z,H.h(this,1))},
M:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.dB(z,b)}else{y=this.eo(b)
return y}},
eo:function(a){var z=this.d
if(z==null)return!1
return this.ax(this.ao(z,J.aS(a)&0x3ffffff),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ap(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.ap(w,b)
x=y==null?null:y.b
return x}else return this.ep(b)},
ep:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ao(z,J.aS(a)&0x3ffffff)
x=this.ax(y,a)
if(x<0)return
return y[x].b},
i:function(a,b,c){var z,y,x,w,v,u
H.t(b,H.h(this,0))
H.t(c,H.h(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.aQ()
this.b=z}this.bu(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aQ()
this.c=y}this.bu(y,b,c)}else{x=this.d
if(x==null){x=this.aQ()
this.d=x}w=J.aS(b)&0x3ffffff
v=this.ao(x,w)
if(v==null)this.aW(x,w,[this.aI(b,c)])
else{u=this.ax(v,b)
if(u>=0)v[u].b=c
else v.push(this.aI(b,c))}}},
ew:function(a,b){var z=this.eq(b)
return z},
eq:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ao(z,a.gv(a)&0x3ffffff)
x=this.ax(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.e0(w)
return w.b},
c1:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.aH()}},
u:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[H.h(this,0),H.h(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(P.bj(this))
z=z.c}},
bu:function(a,b,c){var z
H.t(b,H.h(this,0))
H.t(c,H.h(this,1))
z=this.ap(a,b)
if(z==null)this.aW(a,b,this.aI(b,c))
else z.b=c},
aH:function(){this.r=this.r+1&67108863},
aI:function(a,b){var z,y
z=new H.iH(H.t(a,H.h(this,0)),H.t(b,H.h(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.aH()
return z},
e0:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.aH()},
ax:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.bE(a[y].a,b))return y
return-1},
j:function(a){return P.c7(this)},
ap:function(a,b){return a[b]},
ao:function(a,b){return a[b]},
aW:function(a,b,c){a[b]=c},
dD:function(a,b){delete a[b]},
dB:function(a,b){return this.ap(a,b)!=null},
aQ:function(){var z=Object.create(null)
this.aW(z,"<non-identifier-key>",z)
this.dD(z,"<non-identifier-key>")
return z},
$iseh:1},
iD:{"^":"j;a",
$1:[function(a){var z=this.a
return z.h(0,H.t(a,H.h(z,0)))},null,null,4,0,null,14,"call"],
$S:function(){var z=this.a
return{func:1,ret:H.h(z,1),args:[H.h(z,0)]}}},
iH:{"^":"a;a,b,0c,0d"},
a9:{"^":"e2;a,$ti",
gk:function(a){return this.a.a},
gA:function(a){var z,y
z=this.a
y=new H.iI(z,z.r,this.$ti)
y.c=z.e
return y}},
iI:{"^":"a;a,b,0c,0d,$ti",
sbv:function(a){this.d=H.t(a,H.h(this,0))},
gB:function(a){return this.d},
q:function(){var z=this.a
if(this.b!==z.r)throw H.c(P.bj(z))
else{z=this.c
if(z==null){this.sbv(null)
return!1}else{this.sbv(z.a)
this.c=this.c.c
return!0}}},
$isaY:1},
mg:{"^":"j:2;a",
$1:function(a){return this.a(a)}},
mh:{"^":"j:34;a",
$2:function(a,b){return this.a(a,b)}},
mi:{"^":"j:29;a",
$1:function(a){return this.a(H.r(a))}}}],["","",,H,{"^":"",
m7:function(a){return J.iy(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
be:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
co:function(a){var z,y
if(!!J.C(a).$isv)return a
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)C.a.i(z,y,a[y])
return z},
ak:function(a,b,c){if(a>>>0!==a||a>=c)throw H.c(H.aR(b,a))},
j_:{"^":"i;",$isd9:1,"%":"DataView;ArrayBufferView;d1|eZ|f_|ek|f0|f1|aB"},
d1:{"^":"j_;",
gk:function(a){return a.length},
$isv:1,
$asv:I.b9,
$isx:1,
$asx:I.b9},
ek:{"^":"f_;",
h:function(a,b){H.ak(b,a,a.length)
return a[b]},
i:function(a,b,c){H.dw(c)
H.ak(b,a,a.length)
a[b]=c},
$asc2:function(){return[P.F]},
$asq:function(){return[P.F]},
$isn:1,
$asn:function(){return[P.F]},
$isd:1,
$asd:function(){return[P.F]},
"%":"Float64Array"},
aB:{"^":"f1;",
i:function(a,b,c){H.P(c)
H.ak(b,a,a.length)
a[b]=c},
$asc2:function(){return[P.w]},
$asq:function(){return[P.w]},
$isn:1,
$asn:function(){return[P.w]},
$isd:1,
$asd:function(){return[P.w]}},
iZ:{"^":"ek;",$isaX:1,"%":"Float32Array"},
nC:{"^":"aB;",
h:function(a,b){H.ak(b,a,a.length)
return a[b]},
"%":"Int16Array"},
nD:{"^":"aB;",
h:function(a,b){H.ak(b,a,a.length)
return a[b]},
$isnp:1,
"%":"Int32Array"},
nE:{"^":"aB;",
h:function(a,b){H.ak(b,a,a.length)
return a[b]},
"%":"Int8Array"},
nF:{"^":"aB;",
h:function(a,b){H.ak(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
j0:{"^":"aB;",
h:function(a,b){H.ak(b,a,a.length)
return a[b]},
$isoc:1,
"%":"Uint32Array"},
nG:{"^":"aB;",
gk:function(a){return a.length},
h:function(a,b){H.ak(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
nH:{"^":"aB;",
gk:function(a){return a.length},
h:function(a,b){H.ak(b,a,a.length)
return a[b]},
$isod:1,
"%":";Uint8Array"},
eZ:{"^":"d1+q;"},
f_:{"^":"eZ+c2;"},
f0:{"^":"d1+q;"},
f1:{"^":"f0+c2;"}}],["","",,P,{"^":"",
k6:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.m1()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.b8(new P.k8(z),1)).observe(y,{childList:true})
return new P.k7(z,y,x)}else if(self.setImmediate!=null)return P.m2()
return P.m3()},
om:[function(a){self.scheduleImmediate(H.b8(new P.k9(H.f(a,{func:1,ret:-1})),0))},"$1","m1",4,0,6],
on:[function(a){self.setImmediate(H.b8(new P.ka(H.f(a,{func:1,ret:-1})),0))},"$1","m2",4,0,6],
oo:[function(a){P.d8(C.K,H.f(a,{func:1,ret:-1}))},"$1","m3",4,0,6],
d8:function(a,b){var z
H.f(b,{func:1,ret:-1})
z=C.b.w(a.a,1000)
return P.lu(z<0?0:z,b)},
fd:function(a,b){if(H.ba(a,{func:1,args:[P.a,P.a_]}))return b.cv(a,null,P.a,P.a_)
if(H.ba(a,{func:1,args:[P.a]})){b.toString
return H.f(a,{func:1,ret:null,args:[P.a]})}throw H.c(P.dR(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
lT:function(){var z,y
for(;z=$.b6,z!=null;){$.bx=null
y=z.b
$.b6=y
if(y==null)$.bw=null
z.a.$0()}},
ox:[function(){$.dr=!0
try{P.lT()}finally{$.bx=null
$.dr=!1
if($.b6!=null)$.$get$dd().$1(P.fo())}},"$0","fo",0,0,0],
fh:function(a){var z=new P.eN(H.f(a,{func:1,ret:-1}))
if($.b6==null){$.bw=z
$.b6=z
if(!$.dr)$.$get$dd().$1(P.fo())}else{$.bw.b=z
$.bw=z}},
lX:function(a){var z,y,x
H.f(a,{func:1,ret:-1})
z=$.b6
if(z==null){P.fh(a)
$.bx=$.bw
return}y=new P.eN(a)
x=$.bx
if(x==null){y.b=z
$.bx=y
$.b6=y}else{y.b=x.b
x.b=y
$.bx=y
if(y.b==null)$.bw=y}},
fN:function(a){var z,y
z={func:1,ret:-1}
H.f(a,z)
y=$.B
if(C.d===y){P.aO(null,null,C.d,a)
return}y.toString
P.aO(null,null,y,H.f(y.b0(a),z))},
fg:function(a){var z,y,x,w
H.f(a,{func:1})
if(a==null)return
try{a.$0()}catch(x){z=H.at(x)
y=H.bc(x)
w=$.B
w.toString
P.by(null,null,w,z,H.k(y,"$isa_"))}},
lU:[function(a,b){var z=$.B
z.toString
P.by(null,null,z,a,b)},function(a){return P.lU(a,null)},"$2","$1","m4",4,2,7],
ow:[function(){},"$0","fn",0,0,0],
jS:function(a,b){var z,y
z={func:1,ret:-1}
H.f(b,z)
y=$.B
if(y===C.d){y.toString
return P.d8(a,b)}return P.d8(a,H.f(y.b0(b),z))},
by:function(a,b,c,d,e){var z={}
z.a=d
P.lX(new P.lV(z,e))},
fe:function(a,b,c,d,e){var z,y
H.f(d,{func:1,ret:e})
y=$.B
if(y===c)return d.$0()
$.B=c
z=y
try{y=d.$0()
return y}finally{$.B=z}},
ff:function(a,b,c,d,e,f,g){var z,y
H.f(d,{func:1,ret:f,args:[g]})
H.t(e,g)
y=$.B
if(y===c)return d.$1(e)
$.B=c
z=y
try{y=d.$1(e)
return y}finally{$.B=z}},
lW:function(a,b,c,d,e,f,g,h,i){var z,y
H.f(d,{func:1,ret:g,args:[h,i]})
H.t(e,h)
H.t(f,i)
y=$.B
if(y===c)return d.$2(e,f)
$.B=c
z=y
try{y=d.$2(e,f)
return y}finally{$.B=z}},
aO:function(a,b,c,d){var z
H.f(d,{func:1,ret:-1})
z=C.d!==c
if(z){if(z){c.toString
z=!1}else z=!0
d=!z?c.b0(d):c.e5(d,-1)}P.fh(d)},
k8:{"^":"j:5;a",
$1:[function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()},null,null,4,0,null,2,"call"]},
k7:{"^":"j:36;a,b,c",
$1:function(a){var z,y
this.a.a=H.f(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
k9:{"^":"j:1;a",
$0:[function(){this.a.$0()},null,null,0,0,null,"call"]},
ka:{"^":"j:1;a",
$0:[function(){this.a.$0()},null,null,0,0,null,"call"]},
lt:{"^":"a;a,0b,c",
dm:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.b8(new P.lv(this,b),0),a)
else throw H.c(P.A("`setTimeout()` not found."))},
p:{
lu:function(a,b){var z=new P.lt(!0,0)
z.dm(a,b)
return z}}},
lv:{"^":"j:0;a,b",
$0:[function(){var z=this.a
z.b=null
z.c=1
this.b.$0()},null,null,0,0,null,"call"]},
kd:{"^":"eR;a,$ti"},
Y:{"^":"kg;dx,0dy,0fr,x,0a,0b,0c,d,e,0f,0r,$ti",
sa9:function(a){this.dy=H.p(a,"$isY",this.$ti,"$asY")},
sar:function(a){this.fr=H.p(a,"$isY",this.$ti,"$asY")},
aS:function(){},
aT:function(){}},
eP:{"^":"a;Z:c<,0d,0e,$ti",
sbH:function(a){this.d=H.p(a,"$isY",this.$ti,"$asY")},
sbJ:function(a){this.e=H.p(a,"$isY",this.$ti,"$asY")},
gaq:function(){return this.c<4},
dE:function(){var z=this.r
if(z!=null)return z
z=new P.a0(0,$.B,[null])
this.r=z
return z},
bN:function(a){var z,y
H.p(a,"$isY",this.$ti,"$asY")
z=a.fr
y=a.dy
if(z==null)this.sbH(y)
else z.sa9(y)
if(y==null)this.sbJ(z)
else y.sar(z)
a.sar(a)
a.sa9(a)},
dX:function(a,b,c,d){var z,y,x,w,v,u
z=H.h(this,0)
H.f(a,{func:1,ret:-1,args:[z]})
H.f(c,{func:1,ret:-1})
if((this.c&4)!==0){if(c==null)c=P.fn()
z=new P.ks($.B,0,c,this.$ti)
z.dT()
return z}y=$.B
x=d?1:0
w=this.$ti
v=new P.Y(0,this,y,x,w)
v.dk(a,b,c,d,z)
v.sar(v)
v.sa9(v)
H.p(v,"$isY",w,"$asY")
v.dx=this.c&1
u=this.e
this.sbJ(v)
v.sa9(null)
v.sar(u)
if(u==null)this.sbH(v)
else u.sa9(v)
z=this.d
y=this.e
if(z==null?y==null:z===y)P.fg(this.a)
return v},
dP:function(a){var z=this.$ti
a=H.p(H.p(a,"$isah",z,"$asah"),"$isY",z,"$asY")
if(a.dy===a)return
z=a.dx
if((z&2)!==0)a.dx=z|4
else{this.bN(a)
if((this.c&2)===0&&this.d==null)this.aM()}return},
aJ:["d4",function(){if((this.c&4)!==0)return new P.cd("Cannot add new events after calling close")
return new P.cd("Cannot add new events while doing an addStream")}],
l:[function(a,b){H.t(b,H.h(this,0))
if(!this.gaq())throw H.c(this.aJ())
this.au(b)},"$1","ge1",5,0,27],
c4:function(a){var z
if((this.c&4)!==0)return this.r
if(!this.gaq())throw H.c(this.aJ())
this.c|=4
z=this.dE()
this.aa()
return z},
bI:function(a){var z,y,x,w
H.f(a,{func:1,ret:-1,args:[[P.aM,H.h(this,0)]]})
z=this.c
if((z&2)!==0)throw H.c(P.bU("Cannot fire new event. Controller is already firing an event"))
y=this.d
if(y==null)return
x=z&1
this.c=z^3
for(;y!=null;){z=y.dx
if((z&1)===x){y.dx=z|2
a.$1(y)
z=y.dx^=1
w=y.dy
if((z&4)!==0)this.bN(y)
y.dx&=4294967293
y=w}else y=y.dy}this.c&=4294967293
if(this.d==null)this.aM()},
aM:function(){if((this.c&4)!==0&&this.r.a===0)this.r.aL(null)
P.fg(this.b)},
$ises:1,
$isou:1,
$isb4:1},
lo:{"^":"eP;a,b,c,0d,0e,0f,0r,$ti",
gaq:function(){return P.eP.prototype.gaq.call(this)&&(this.c&2)===0},
aJ:function(){if((this.c&2)!==0)return new P.cd("Cannot fire new event. Controller is already firing an event")
return this.d4()},
au:function(a){var z
H.t(a,H.h(this,0))
z=this.d
if(z==null)return
if(z===this.e){this.c|=2
z.bw(0,a)
this.c&=4294967293
if(this.d==null)this.aM()
return}this.bI(new P.lp(this,a))},
aa:function(){if(this.d!=null)this.bI(new P.lq(this))
else this.r.aL(null)}},
lp:{"^":"j;a,b",
$1:function(a){H.p(a,"$isaM",[H.h(this.a,0)],"$asaM").bw(0,this.b)},
$S:function(){return{func:1,ret:P.z,args:[[P.aM,H.h(this.a,0)]]}}},
lq:{"^":"j;a",
$1:function(a){H.p(a,"$isaM",[H.h(this.a,0)],"$asaM").dv()},
$S:function(){return{func:1,ret:P.z,args:[[P.aM,H.h(this.a,0)]]}}},
kf:{"^":"a;$ti",
ec:[function(a,b){var z
if(a==null)a=new P.d2()
z=this.a
if(z.a!==0)throw H.c(P.bU("Future already completed"))
$.B.toString
z.dr(a,b)},function(a){return this.ec(a,null)},"eb","$2","$1","gea",4,2,7]},
k5:{"^":"kf;a,$ti"},
aN:{"^":"a;0a,b,c,d,e,$ti",
es:function(a){if(this.c!==6)return!0
return this.b.b.b3(H.f(this.d,{func:1,ret:P.dt,args:[P.a]}),a.a,P.dt,P.a)},
en:function(a){var z,y,x,w
z=this.e
y=P.a
x={futureOr:1,type:H.h(this,1)}
w=this.b.b
if(H.ba(z,{func:1,args:[P.a,P.a_]}))return H.bW(w.ex(z,a.a,a.b,null,y,P.a_),x)
else return H.bW(w.b3(H.f(z,{func:1,args:[P.a]}),a.a,null,y),x)}},
a0:{"^":"a;Z:a<,b,0dS:c<,$ti",
gdJ:function(){return this.a===8},
cE:function(a,b,c){var z,y,x,w
z=H.h(this,0)
H.f(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.B
if(y!==C.d){y.toString
H.f(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.fd(b,y)}H.f(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.a0(0,$.B,[c])
w=b==null?1:3
this.aK(new P.aN(x,w,a,b,[z,c]))
return x},
b6:function(a,b){return this.cE(a,null,b)},
dV:function(a){H.t(a,H.h(this,0))
this.a=4
this.c=a},
aK:function(a){var z,y
z=this.a
if(z<=1){a.a=H.k(this.c,"$isaN")
this.c=a}else{if(z===2){y=H.k(this.c,"$isa0")
z=y.a
if(z<4){y.aK(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.aO(null,null,z,H.f(new P.kA(this,a),{func:1,ret:-1}))}},
bM:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.k(this.c,"$isaN")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.k(this.c,"$isa0")
y=u.a
if(y<4){u.bM(a)
return}this.a=y
this.c=u.c}z.a=this.at(a)
y=this.b
y.toString
P.aO(null,null,y,H.f(new P.kH(z,this),{func:1,ret:-1}))}},
as:function(){var z=H.k(this.c,"$isaN")
this.c=null
return this.at(z)},
at:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
bC:function(a){var z,y,x
z=H.h(this,0)
H.bW(a,{futureOr:1,type:z})
y=this.$ti
if(H.aQ(a,"$isaf",y,"$asaf"))if(H.aQ(a,"$isa0",y,null))P.ck(a,this)
else P.eW(a,this)
else{x=this.as()
H.t(a,z)
this.a=4
this.c=a
P.b5(this,x)}},
am:[function(a,b){var z
H.k(b,"$isa_")
z=this.as()
this.a=8
this.c=new P.a2(a,b)
P.b5(this,z)},function(a){return this.am(a,null)},"eJ","$2","$1","gdz",4,2,7,3,1,4],
aL:function(a){var z
H.bW(a,{futureOr:1,type:H.h(this,0)})
if(H.aQ(a,"$isaf",this.$ti,"$asaf")){this.dt(a)
return}this.a=1
z=this.b
z.toString
P.aO(null,null,z,H.f(new P.kC(this,a),{func:1,ret:-1}))},
dt:function(a){var z=this.$ti
H.p(a,"$isaf",z,"$asaf")
if(H.aQ(a,"$isa0",z,null)){if(a.gdJ()){this.a=1
z=this.b
z.toString
P.aO(null,null,z,H.f(new P.kG(this,a),{func:1,ret:-1}))}else P.ck(a,this)
return}P.eW(a,this)},
dr:function(a,b){var z
this.a=1
z=this.b
z.toString
P.aO(null,null,z,H.f(new P.kB(this,a,b),{func:1,ret:-1}))},
$isaf:1,
p:{
eW:function(a,b){var z,y,x
b.a=1
try{a.cE(new P.kD(b),new P.kE(b),null)}catch(x){z=H.at(x)
y=H.bc(x)
P.fN(new P.kF(b,z,y))}},
ck:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.k(a.c,"$isa0")
if(z>=4){y=b.as()
b.a=a.a
b.c=a.c
P.b5(b,y)}else{y=H.k(b.c,"$isaN")
b.a=2
b.c=a
a.bM(y)}},
b5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.k(y.c,"$isa2")
y=y.b
u=v.a
t=v.b
y.toString
P.by(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.b5(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==null?q==null:p===q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.k(r,"$isa2")
y=y.b
u=r.a
t=r.b
y.toString
P.by(null,null,y,u,t)
return}o=$.B
if(o==null?q!=null:o!==q)$.B=q
else o=null
y=b.c
if(y===8)new P.kK(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.kJ(x,b,r).$0()}else if((y&2)!==0)new P.kI(z,x,b).$0()
if(o!=null)$.B=o
y=x.b
if(!!J.C(y).$isaf){if(y.a>=4){n=H.k(t.c,"$isaN")
t.c=null
b=t.at(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.ck(y,t)
return}}m=b.b
n=H.k(m.c,"$isaN")
m.c=null
b=m.at(n)
y=x.a
u=x.b
if(!y){H.t(u,H.h(m,0))
m.a=4
m.c=u}else{H.k(u,"$isa2")
m.a=8
m.c=u}z.a=m
y=m}}}},
kA:{"^":"j:1;a,b",
$0:function(){P.b5(this.a,this.b)}},
kH:{"^":"j:1;a,b",
$0:function(){P.b5(this.b,this.a.a)}},
kD:{"^":"j:5;a",
$1:function(a){var z=this.a
z.a=0
z.bC(a)}},
kE:{"^":"j:26;a",
$2:[function(a,b){this.a.am(a,H.k(b,"$isa_"))},function(a){return this.$2(a,null)},"$1",null,null,null,4,2,null,3,1,4,"call"]},
kF:{"^":"j:1;a,b,c",
$0:function(){this.a.am(this.b,this.c)}},
kC:{"^":"j:1;a,b",
$0:function(){var z,y,x
z=this.a
y=H.t(this.b,H.h(z,0))
x=z.as()
z.a=4
z.c=y
P.b5(z,x)}},
kG:{"^":"j:1;a,b",
$0:function(){P.ck(this.b,this.a)}},
kB:{"^":"j:1;a,b,c",
$0:function(){this.a.am(this.b,this.c)}},
kK:{"^":"j:0;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.cz(H.f(w.d,{func:1}),null)}catch(v){y=H.at(v)
x=H.bc(v)
if(this.d){w=H.k(this.a.a.c,"$isa2").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.k(this.a.a.c,"$isa2")
else u.b=new P.a2(y,x)
u.a=!0
return}if(!!J.C(z).$isaf){if(z instanceof P.a0&&z.gZ()>=4){if(z.gZ()===8){w=this.b
w.b=H.k(z.gdS(),"$isa2")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.b6(new P.kL(t),null)
w.a=!1}}},
kL:{"^":"j:25;a",
$1:function(a){return this.a}},
kJ:{"^":"j:0;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
x.toString
w=H.h(x,0)
v=H.t(this.c,w)
u=H.h(x,1)
this.a.b=x.b.b.b3(H.f(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.at(t)
y=H.bc(t)
x=this.a
x.b=new P.a2(z,y)
x.a=!0}}},
kI:{"^":"j:0;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.k(this.a.a.c,"$isa2")
w=this.c
if(w.es(z)&&w.e!=null){v=this.b
v.b=w.en(z)
v.a=!1}}catch(u){y=H.at(u)
x=H.bc(u)
w=H.k(this.a.a.c,"$isa2")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.a2(y,x)
s.a=!0}}},
eN:{"^":"a;a,0b"},
aH:{"^":"a;$ti",
gk:function(a){var z,y
z={}
y=new P.a0(0,$.B,[P.w])
z.a=0
this.ab(new P.jN(z,this),!0,new P.jO(z,y),y.gdz())
return y}},
jN:{"^":"j;a,b",
$1:[function(a){H.t(a,H.h(this.b,0));++this.a.a},null,null,4,0,null,2,"call"],
$S:function(){return{func:1,ret:P.z,args:[H.h(this.b,0)]}}},
jO:{"^":"j:1;a,b",
$0:[function(){this.b.bC(this.a.a)},null,null,0,0,null,"call"]},
ah:{"^":"a;$ti"},
eR:{"^":"lj;$ti",
gv:function(a){return(H.b1(this.a)^892482866)>>>0},
E:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.eR))return!1
return b.a===this.a}},
kg:{"^":"aM;$ti",
bL:function(){return this.x.dP(this)},
aS:function(){H.p(this,"$isah",[H.h(this.x,0)],"$asah")},
aT:function(){H.p(this,"$isah",[H.h(this.x,0)],"$asah")}},
aM:{"^":"a;0a,0c,Z:e<,0r,$ti",
sdq:function(a){this.a=H.f(a,{func:1,ret:-1,args:[H.h(this,0)]})},
sdN:function(a){this.c=H.f(a,{func:1,ret:-1})},
saU:function(a){this.r=H.p(a,"$isdj",this.$ti,"$asdj")},
dk:function(a,b,c,d,e){var z,y,x,w
z=H.h(this,0)
H.f(a,{func:1,ret:-1,args:[z]})
y=this.d
y.toString
this.sdq(H.f(a,{func:1,ret:null,args:[z]}))
x=b==null?P.m4():b
if(H.ba(x,{func:1,ret:-1,args:[P.a,P.a_]}))this.b=y.cv(x,null,P.a,P.a_)
else if(H.ba(x,{func:1,ret:-1,args:[P.a]}))this.b=H.f(x,{func:1,ret:null,args:[P.a]})
else H.N(P.am("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
H.f(c,{func:1,ret:-1})
w=c==null?P.fn():c
this.sdN(H.f(w,{func:1,ret:-1}))},
av:function(a){var z=this.e&=4294967279
if((z&8)===0)this.bz()
z=$.$get$cO()
return z},
bz:function(){var z,y
z=this.e|=8
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.saU(null)
this.f=this.bL()},
bw:function(a,b){var z
H.t(b,H.h(this,0))
z=this.e
if((z&8)!==0)return
if(z<32)this.au(b)
else this.by(new P.km(b,this.$ti))},
dv:function(){var z=this.e
if((z&8)!==0)return
z|=2
this.e=z
if(z<32)this.aa()
else this.by(C.J)},
aS:function(){},
aT:function(){},
bL:function(){return},
by:function(a){var z,y
z=this.$ti
y=H.p(this.r,"$isdk",z,"$asdk")
if(y==null){y=new P.dk(0,z)
this.saU(y)}z=y.c
if(z==null){y.c=a
y.b=a}else{z.sac(0,a)
y.c=a}z=this.e
if((z&64)===0){z|=64
this.e=z
if(z<128)this.r.bh(this)}},
au:function(a){var z,y
z=H.h(this,0)
H.t(a,z)
y=this.e
this.e=y|32
this.d.cA(this.a,a,z)
this.e&=4294967263
this.du((y&4)!==0)},
aa:function(){this.bz()
this.e|=16
new P.ke(this).$0()},
du:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z&=4294967231
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z&=4294967291
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.saU(null)
return}x=(z&4)!==0
if(a===x)break
this.e=z^32
if(x)this.aS()
else this.aT()
z=this.e&=4294967263}if((z&64)!==0&&z<128)this.r.bh(this)},
$isah:1,
$isb4:1},
ke:{"^":"j:0;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=y|42
z.d.b2(z.c)
z.e&=4294967263}},
lj:{"^":"aH;$ti",
ab:function(a,b,c,d){H.f(a,{func:1,ret:-1,args:[H.h(this,0)]})
H.f(c,{func:1,ret:-1})
return this.a.dX(H.f(a,{func:1,ret:-1,args:[H.h(this,0)]}),d,c,!0===b)}},
cj:{"^":"a;0ac:a>,$ti",
sac:function(a,b){this.a=H.k(b,"$iscj")}},
km:{"^":"cj;b,0a,$ti",
cs:function(a){H.p(a,"$isb4",this.$ti,"$asb4").au(this.b)}},
kn:{"^":"a;",
cs:function(a){a.aa()},
gac:function(a){return},
sac:function(a,b){throw H.c(P.bU("No events after a done."))},
$iscj:1,
$ascj:I.b9},
dj:{"^":"a;Z:a<,$ti",
bh:function(a){var z
H.p(a,"$isb4",this.$ti,"$asb4")
z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.fN(new P.l3(this,a))
this.a=1}},
l3:{"^":"j:1;a,b",
$0:function(){var z,y,x,w,v
z=this.a
y=z.a
z.a=0
if(y===3)return
x=H.p(this.b,"$isb4",[H.h(z,0)],"$asb4")
w=z.b
v=w.gac(w)
z.b=v
if(v==null)z.c=null
w.cs(x)}},
dk:{"^":"dj;0b,0c,a,$ti"},
ks:{"^":"a;a,Z:b<,c,$ti",
dT:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.aO(null,null,z,H.f(this.gdU(),{func:1,ret:-1}))
this.b|=2},
av:function(a){return $.$get$cO()},
aa:[function(){var z=this.b&=4294967293
if(z>=4)return
this.b=z|1
this.a.b2(this.c)},"$0","gdU",0,0,0],
$isah:1},
a2:{"^":"a;a,b",
j:function(a){return H.e(this.a)},
$isQ:1},
lC:{"^":"a;",$isol:1},
lV:{"^":"j:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.d2()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=y.j(0)
throw x}},
l9:{"^":"lC;",
b2:function(a){var z,y,x
H.f(a,{func:1,ret:-1})
try{if(C.d===$.B){a.$0()
return}P.fe(null,null,this,a,-1)}catch(x){z=H.at(x)
y=H.bc(x)
P.by(null,null,this,z,H.k(y,"$isa_"))}},
cA:function(a,b,c){var z,y,x
H.f(a,{func:1,ret:-1,args:[c]})
H.t(b,c)
try{if(C.d===$.B){a.$1(b)
return}P.ff(null,null,this,a,b,-1,c)}catch(x){z=H.at(x)
y=H.bc(x)
P.by(null,null,this,z,H.k(y,"$isa_"))}},
e5:function(a,b){return new P.lb(this,H.f(a,{func:1,ret:b}),b)},
b0:function(a){return new P.la(this,H.f(a,{func:1,ret:-1}))},
e6:function(a,b){return new P.lc(this,H.f(a,{func:1,ret:-1,args:[b]}),b)},
h:function(a,b){return},
cz:function(a,b){H.f(a,{func:1,ret:b})
if($.B===C.d)return a.$0()
return P.fe(null,null,this,a,b)},
b3:function(a,b,c,d){H.f(a,{func:1,ret:c,args:[d]})
H.t(b,d)
if($.B===C.d)return a.$1(b)
return P.ff(null,null,this,a,b,c,d)},
ex:function(a,b,c,d,e,f){H.f(a,{func:1,ret:d,args:[e,f]})
H.t(b,e)
H.t(c,f)
if($.B===C.d)return a.$2(b,c)
return P.lW(null,null,this,a,b,c,d,e,f)},
cv:function(a,b,c,d){return H.f(a,{func:1,ret:b,args:[c,d]})}},
lb:{"^":"j;a,b,c",
$0:function(){return this.a.cz(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
la:{"^":"j:0;a,b",
$0:function(){return this.a.b2(this.b)}},
lc:{"^":"j;a,b,c",
$1:[function(a){var z=this.c
return this.a.cA(this.b,H.t(a,z),z)},null,null,4,0,null,15,"call"],
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
a4:function(a,b,c){H.bd(a)
return H.p(H.ma(a,new H.c4(0,0,[b,c])),"$iseh",[b,c],"$aseh")},
V:function(a,b){return new H.c4(0,0,[a,b])},
ei:function(a,b,c,d){return new P.kT(0,0,[d])},
ix:function(a,b,c){var z,y
if(P.ds(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bz()
C.a.l(y,a)
try{P.lS(a,z)}finally{if(0>=y.length)return H.m(y,-1)
y.pop()}y=P.et(b,H.mq(z,"$isn"),", ")+c
return y.charCodeAt(0)==0?y:y},
cR:function(a,b,c){var z,y,x
if(P.ds(a))return b+"..."+c
z=new P.ce(b)
y=$.$get$bz()
C.a.l(y,a)
try{x=z
x.sI(P.et(x.gI(),a,", "))}finally{if(0>=y.length)return H.m(y,-1)
y.pop()}y=z
y.sI(y.gI()+c)
y=z.gI()
return y.charCodeAt(0)==0?y:y},
ds:function(a){var z,y
for(z=0;y=$.$get$bz(),z<y.length;++z)if(a===y[z])return!0
return!1},
lS:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.q())return
w=H.e(z.gB(z))
C.a.l(b,w)
y+=w.length+2;++x}if(!z.q()){if(x<=5)return
if(0>=b.length)return H.m(b,-1)
v=b.pop()
if(0>=b.length)return H.m(b,-1)
u=b.pop()}else{t=z.gB(z);++x
if(!z.q()){if(x<=4){C.a.l(b,H.e(t))
return}v=H.e(t)
if(0>=b.length)return H.m(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gB(z);++x
for(;z.q();t=s,s=r){r=z.gB(z);++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.m(b,-1)
y-=b.pop().length+2;--x}C.a.l(b,"...")
return}}u=H.e(t)
v=H.e(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.m(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.l(b,q)
C.a.l(b,u)
C.a.l(b,v)},
iJ:function(a,b){var z,y,x
z=P.ei(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.T)(a),++x)z.l(0,H.t(a[x],b))
return z},
c7:function(a){var z,y,x
z={}
if(P.ds(a))return"{...}"
y=new P.ce("")
try{C.a.l($.$get$bz(),a)
x=y
x.sI(x.gI()+"{")
z.a=!0
J.hb(a,new P.iQ(z,y))
z=y
z.sI(z.gI()+"}")}finally{z=$.$get$bz()
if(0>=z.length)return H.m(z,-1)
z.pop()}z=y.gI()
return z.charCodeAt(0)==0?z:z},
kT:{"^":"kN;a,0b,0c,0d,0e,0f,r,$ti",
gA:function(a){return P.eY(this,this.r,H.h(this,0))},
gk:function(a){return this.a},
ed:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return H.k(z[b],"$isdh")!=null}else{y=this.dA(b)
return y}},
dA:function(a){var z=this.d
if(z==null)return!1
return this.bG(this.dG(z,a),a)>=0},
l:function(a,b){var z,y
H.t(b,H.h(this,0))
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.di()
this.b=z}return this.bx(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.di()
this.c=y}return this.bx(y,b)}else return this.dw(0,b)},
dw:function(a,b){var z,y,x
H.t(b,H.h(this,0))
z=this.d
if(z==null){z=P.di()
this.d=z}y=this.bD(b)
x=z[y]
if(x==null)z[y]=[this.aR(b)]
else{if(this.bG(x,b)>=0)return!1
x.push(this.aR(b))}return!0},
bx:function(a,b){H.t(b,H.h(this,0))
if(H.k(a[b],"$isdh")!=null)return!1
a[b]=this.aR(b)
return!0},
bK:function(){this.r=this.r+1&67108863},
aR:function(a){var z,y
z=new P.dh(H.t(a,H.h(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.bK()
return z},
bD:function(a){return J.aS(a)&0x3ffffff},
dG:function(a,b){return a[this.bD(b)]},
bG:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.bE(a[y].a,b))return y
return-1},
p:{
di:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
dh:{"^":"a;a,0b,0c"},
kU:{"^":"a;a,b,0c,0d,$ti",
sbB:function(a){this.d=H.t(a,H.h(this,0))},
gB:function(a){return this.d},
q:function(){var z=this.a
if(this.b!==z.r)throw H.c(P.bj(z))
else{z=this.c
if(z==null){this.sbB(null)
return!1}else{this.sbB(H.t(z.a,H.h(this,0)))
this.c=this.c.b
return!0}}},
$isaY:1,
p:{
eY:function(a,b,c){var z=new P.kU(a,b,[c])
z.c=a.e
return z}}},
kN:{"^":"jC;"},
iK:{"^":"kV;",$isn:1,$isd:1},
q:{"^":"a;$ti",
gA:function(a){return new H.cY(a,this.gk(a),0,[H.bD(this,a,"q",0)])},
t:function(a,b){return this.h(a,b)},
cm:function(a,b,c){var z=H.bD(this,a,"q",0)
return new H.d_(a,H.f(b,{func:1,ret:c,args:[z]}),[z,c])},
el:function(a,b,c,d){var z,y,x
H.t(b,d)
H.f(c,{func:1,ret:d,args:[d,H.bD(this,a,"q",0)]})
z=this.gk(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gk(a))throw H.c(P.bj(a))}return y},
j:function(a){return P.cR(a,"[","]")}},
cZ:{"^":"W;"},
iQ:{"^":"j:13;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
W:{"^":"a;$ti",
u:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[H.bD(this,a,"W",0),H.bD(this,a,"W",1)]})
for(z=J.aT(this.gG(a));z.q();){y=z.gB(z)
b.$2(y,this.h(a,y))}},
gk:function(a){return J.aU(this.gG(a))},
j:function(a){return P.c7(a)},
$isD:1},
lA:{"^":"a;$ti"},
iR:{"^":"a;$ti",
h:function(a,b){return this.a.h(0,b)},
u:function(a,b){this.a.u(0,H.f(b,{func:1,ret:-1,args:[H.h(this,0),H.h(this,1)]}))},
gk:function(a){return this.a.a},
j:function(a){return P.c7(this.a)},
$isD:1},
k0:{"^":"lB;$ti"},
jD:{"^":"a;$ti",
j:function(a){return P.cR(this,"{","}")},
$isn:1,
$isnY:1},
jC:{"^":"jD;"},
kV:{"^":"a+q;"},
lB:{"^":"iR+lA;$ti"}}],["","",,P,{"^":"",
ml:function(a,b,c){var z=H.jp(a,c)
if(z!=null)return z
throw H.c(P.e9(a,null,null))},
fq:function(a,b){var z=H.jo(a)
if(z!=null)return z
throw H.c(P.e9("Invalid double",a,null))},
i1:function(a){if(a instanceof H.j)return a.j(0)
return"Instance of '"+H.br(a)+"'"},
c5:function(a,b,c){var z,y
z=H.l([],[c])
for(y=J.aT(a);y.q();)C.a.l(z,H.t(y.gB(y),c))
return z},
jP:function(a,b,c){var z,y
z=P.w
a=H.p(H.p(a,"$isn",[z],"$asn"),"$isaZ",[z],"$asaZ")
y=a.length
c=P.ju(b,c,y,null,null,null)
return H.jq(b>0||c<y?C.a.cY(a,b,c):a)},
aW:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bh(a)
if(typeof a==="string")return JSON.stringify(a)
return P.i1(a)},
e4:function(a){return new P.kw(a)},
O:function(a){H.be(H.e(a))},
j2:{"^":"j:19;a,b",
$2:function(a,b){var z,y,x
H.k(a,"$isb2")
z=this.b
y=this.a
z.a+=y.a
x=z.a+=H.e(a.a)
z.a=x+": "
z.a+=H.e(P.aW(b))
y.a=", "}},
dt:{"^":"a;"},
"+bool":0,
an:{"^":"a;a,b",
E:function(a,b){if(b==null)return!1
if(!(b instanceof P.an))return!1
return this.a===b.a&&!0},
T:function(a,b){return C.b.T(this.a,H.k(b,"$isan").a)},
gv:function(a){var z=this.a
return(z^C.b.aX(z,30))&1073741823},
j:function(a){var z,y,x,w,v,u,t,s
z=P.hT(H.jn(this))
y=P.bH(H.jm(this))
x=P.bH(H.jl(this))
w=P.bH(H.c8(this))
v=P.bH(H.ca(this))
u=P.bH(H.cb(this))
t=P.hU(H.c9(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
$isU:1,
$asU:function(){return[P.an]},
p:{
hT:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
hU:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bH:function(a){if(a>=10)return""+a
return"0"+a}}},
F:{"^":"M;"},
"+double":0,
ao:{"^":"a;a",
K:function(a,b){return C.b.K(this.a,H.k(b,"$isao").a)},
J:function(a,b){return C.b.J(this.a,H.k(b,"$isao").a)},
E:function(a,b){if(b==null)return!1
if(!(b instanceof P.ao))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
T:function(a,b){return C.b.T(this.a,H.k(b,"$isao").a)},
j:function(a){var z,y,x,w,v
z=new P.i_()
y=this.a
if(y<0)return"-"+new P.ao(0-y).j(0)
x=z.$1(C.b.w(y,6e7)%60)
w=z.$1(C.b.w(y,1e6)%60)
v=new P.hZ().$1(y%1e6)
return""+C.b.w(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
$isU:1,
$asU:function(){return[P.ao]},
p:{
hY:function(a,b,c,d,e,f){return new P.ao(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
hZ:{"^":"j:14;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
i_:{"^":"j:14;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Q:{"^":"a;"},
d2:{"^":"Q;",
j:function(a){return"Throw of null."}},
aV:{"^":"Q;a,b,c,d",
gaO:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaN:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.e(z)
w=this.gaO()+y+x
if(!this.a)return w
v=this.gaN()
u=P.aW(this.b)
return w+v+": "+H.e(u)},
p:{
am:function(a){return new P.aV(!1,null,null,a)},
dR:function(a,b,c){return new P.aV(!0,a,b,c)}}},
d5:{"^":"aV;e,f,a,b,c,d",
gaO:function(){return"RangeError"},
gaN:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else if(x>z)y=": Not in range "+H.e(z)+".."+H.e(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.e(z)}return y},
p:{
jt:function(a){return new P.d5(null,null,!1,null,null,a)},
cc:function(a,b,c){return new P.d5(null,null,!0,a,b,"Value not in range")},
aq:function(a,b,c,d,e){return new P.d5(b,c,!0,a,d,"Invalid value")},
ju:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.aq(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.c(P.aq(b,a,c,"end",f))
return b}return c}}},
iv:{"^":"aV;e,k:f>,a,b,c,d",
gaO:function(){return"RangeError"},
gaN:function(){if(J.fR(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.e(z)},
p:{
H:function(a,b,c,d,e){var z=H.P(e!=null?e:J.aU(b))
return new P.iv(b,z,!0,a,c,"Index out of range")}}},
j1:{"^":"Q;a,b,c,d,e",
j:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
y=new P.ce("")
z.a=""
for(x=this.c,w=x.length,v=0,u="",t="";v<w;++v,t=", "){s=x[v]
y.a=u+t
u=y.a+=H.e(P.aW(s))
z.a=", "}this.d.u(0,new P.j2(z,y))
r=P.aW(this.a)
q=y.j(0)
x="NoSuchMethodError: method not found: '"+H.e(this.b.a)+"'\nReceiver: "+H.e(r)+"\nArguments: ["+q+"]"
return x},
p:{
el:function(a,b,c,d,e){return new P.j1(a,b,c,d,e)}}},
k1:{"^":"Q;a",
j:function(a){return"Unsupported operation: "+this.a},
p:{
A:function(a){return new P.k1(a)}}},
jX:{"^":"Q;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
p:{
eK:function(a){return new P.jX(a)}}},
cd:{"^":"Q;a",
j:function(a){return"Bad state: "+this.a},
p:{
bU:function(a){return new P.cd(a)}}},
hL:{"^":"Q;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.aW(z))+"."},
p:{
bj:function(a){return new P.hL(a)}}},
er:{"^":"a;",
j:function(a){return"Stack Overflow"},
$isQ:1},
hS:{"^":"Q;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
kw:{"^":"a;a",
j:function(a){return"Exception: "+this.a}},
ih:{"^":"a;a,b,c",
j:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.e.aA(x,0,75)+"..."
return y+"\n"+x},
p:{
e9:function(a,b,c){return new P.ih(a,b,c)}}},
w:{"^":"M;"},
"+int":0,
n:{"^":"a;$ti",
gk:function(a){var z,y
z=this.gA(this)
for(y=0;z.q();)++y
return y},
t:function(a,b){var z,y,x
if(b<0)H.N(P.aq(b,0,null,"index",null))
for(z=this.gA(this),y=0;z.q();){x=z.gB(z)
if(b===y)return x;++y}throw H.c(P.H(b,this,"index",null,y))},
j:function(a){return P.ix(this,"(",")")}},
aY:{"^":"a;$ti"},
d:{"^":"a;$ti",$isn:1},
"+List":0,
D:{"^":"a;$ti"},
z:{"^":"a;",
gv:function(a){return P.a.prototype.gv.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
M:{"^":"a;",$isU:1,
$asU:function(){return[P.M]}},
"+num":0,
a:{"^":";",
E:function(a,b){return this===b},
gv:function(a){return H.b1(this)},
j:["d3",function(a){return"Instance of '"+H.br(this)+"'"}],
b1:[function(a,b){H.k(b,"$iscQ")
throw H.c(P.el(this,b.gcn(),b.gct(),b.gco(),null))},null,"gcq",5,0,null,0],
gb4:function(a){return new H.bV(H.dA(this))},
toString:function(){return this.j(this)}},
a_:{"^":"a;"},
b:{"^":"a;",$isU:1,
$asU:function(){return[P.b]},
$isjc:1},
"+String":0,
ce:{"^":"a;I:a<",
sI:function(a){this.a=H.r(a)},
gk:function(a){return this.a.length},
j:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
p:{
et:function(a,b,c){var z=J.aT(b)
if(!z.q())return a
if(c.length===0){do a+=H.e(z.gB(z))
while(z.q())}else{a+=H.e(z.gB(z))
for(;z.q();)a=a+c+H.e(z.gB(z))}return a}}},
b2:{"^":"a;"}}],["","",,W,{"^":"",
ir:function(a,b,c){return W.it(a,null,null,b,null,null,null,c).b6(new W.is(),P.b)},
it:function(a,b,c,d,e,f,g,h){var z,y,x,w,v
z=W.bm
y=new P.a0(0,$.B,[z])
x=new P.k5(y,[z])
w=new XMLHttpRequest()
C.M.ev(w,"GET",a,!0)
z=W.bQ
v={func:1,ret:-1,args:[z]}
W.bv(w,"load",H.f(new W.iu(w,x),v),!1,z)
W.bv(w,"error",H.f(x.gea(),v),!1,z)
w.send()
return y},
iw:function(a){var z,y
y=document.createElement("input")
z=H.k(y,"$isap")
return z},
en:function(a,b,c,d){var z=new Option(a,b,c,!1)
return z},
cl:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
eX:function(a,b,c,d){var z,y
z=W.cl(W.cl(W.cl(W.cl(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
cn:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.kj(a)
if(!!J.C(z).$isJ)return z
return}else return H.k(a,"$isJ")},
fk:function(a,b){var z
H.f(a,{func:1,ret:-1,args:[b]})
z=$.B
if(z===C.d)return a
return z.e6(a,b)},
mz:function(a){return C.c.C(document,a)},
a3:{"^":"bk;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
mE:{"^":"i;0k:length=","%":"AccessibleNodeList"},
mF:{"^":"a3;",
j:function(a){return String(a)},
"%":"HTMLAnchorElement"},
mG:{"^":"a3;",
j:function(a){return String(a)},
"%":"HTMLAreaElement"},
cI:{"^":"i;",$iscI:1,"%":";Blob"},
hD:{"^":"a3;","%":"HTMLBodyElement"},
cL:{"^":"a3;0n:height=,0m:width=",
b8:function(a,b,c){var z=this.dH(a,b,P.m5(c,null))
return z},
dH:function(a,b,c){return a.getContext(b,c)},
$iscL:1,
"%":"HTMLCanvasElement"},
mK:{"^":"i;",
az:function(a){return P.a7(a.getContextAttributes())},
"%":"CanvasRenderingContext2D"},
mL:{"^":"E;0k:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
hP:{"^":"cM;",$ishP:1,"%":"CSSNumericValue|CSSUnitValue"},
mM:{"^":"hR;0k:length=","%":"CSSPerspective"},
av:{"^":"i;",$isav:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
mN:{"^":"kh;0k:length=",
bd:function(a,b){var z=this.dI(a,this.ds(a,b))
return z==null?"":z},
ds:function(a,b){var z,y
z=$.$get$dX()
y=z[b]
if(typeof y==="string")return y
y=this.dY(a,b)
z[b]=y
return y},
dY:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.hV()+b
if(z in a)return z
return b},
dI:function(a,b){return a.getPropertyValue(b)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hQ:{"^":"a;",
gn:function(a){return this.bd(a,"height")},
gm:function(a){return this.bd(a,"width")}},
cM:{"^":"i;","%":"CSSImageValue|CSSKeywordValue|CSSPositionValue|CSSResourceValue|CSSURLImageValue;CSSStyleValue"},
hR:{"^":"i;","%":"CSSMatrixComponent|CSSRotation|CSSScale|CSSSkew|CSSTranslation;CSSTransformComponent"},
mO:{"^":"cM;0k:length=","%":"CSSTransformValue"},
mP:{"^":"cM;0k:length=","%":"CSSUnparsedValue"},
mQ:{"^":"i;0k:length=",
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
hW:{"^":"E;",
C:function(a,b){return a.querySelector(b)},
"%":"XMLDocument;Document"},
mT:{"^":"i;",
j:function(a){return String(a)},
"%":"DOMException"},
mU:{"^":"kp;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.p(c,"$isZ",[P.M],"$asZ")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[[P.Z,P.M]]},
$isx:1,
$asx:function(){return[[P.Z,P.M]]},
$asq:function(){return[[P.Z,P.M]]},
$isn:1,
$asn:function(){return[[P.Z,P.M]]},
$isd:1,
$asd:function(){return[[P.Z,P.M]]},
$asu:function(){return[[P.Z,P.M]]},
"%":"ClientRectList|DOMRectList"},
hX:{"^":"i;",
j:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.gm(a))+" x "+H.e(this.gn(a))},
E:function(a,b){var z
if(b==null)return!1
if(!H.aQ(b,"$isZ",[P.M],"$asZ"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.o(b)
z=this.gm(a)===z.gm(b)&&this.gn(a)===z.gn(b)}else z=!1
else z=!1
return z},
gv:function(a){return W.eX(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.gm(a)&0x1FFFFFFF,this.gn(a)&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
$isZ:1,
$asZ:function(){return[P.M]},
"%":";DOMRectReadOnly"},
mV:{"^":"kr;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.r(c)
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[P.b]},
$isx:1,
$asx:function(){return[P.b]},
$asq:function(){return[P.b]},
$isn:1,
$asn:function(){return[P.b]},
$isd:1,
$asd:function(){return[P.b]},
$asu:function(){return[P.b]},
"%":"DOMStringList"},
mW:{"^":"i;0k:length=","%":"DOMTokenList"},
kz:{"^":"iK;a,$ti",
gk:function(a){return this.a.length},
h:function(a,b){var z=this.a
if(b<0||b>=z.length)return H.m(z,b)
return H.t(z[b],H.h(this,0))},
i:function(a,b,c){H.t(c,H.h(this,0))
throw H.c(P.A("Cannot modify list"))},
$ise3:1},
bk:{"^":"E;",
j:function(a){return a.localName},
b7:function(a,b){return a.getAttribute(b)},
dO:function(a,b){return a.querySelectorAll(b)},
gcr:function(a){return new W.eU(a,"click",!1,[W.aA])},
$isbk:1,
"%":";Element"},
mY:{"^":"a3;0n:height=,0m:width=","%":"HTMLEmbedElement"},
R:{"^":"i;",
gb5:function(a){return W.cn(a.target)},
$isR:1,
"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
J:{"^":"i;",
e2:function(a,b,c,d){H.f(c,{func:1,args:[W.R]})
if(c!=null)this.dn(a,b,c,!1)},
dn:function(a,b,c,d){return a.addEventListener(b,H.b8(H.f(c,{func:1,args:[W.R]}),1),!1)},
dQ:function(a,b,c,d){return a.removeEventListener(b,H.b8(H.f(c,{func:1,args:[W.R]}),1),!1)},
$isJ:1,
"%":"AbsoluteOrientationSensor|Accelerometer|AccessibleNode|AmbientLightSensor|AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BackgroundFetchRegistration|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|Clipboard|ConstantSourceNode|ConvolverNode|DOMApplicationCache|DataChannel|DelayNode|DynamicsCompressorNode|EventSource|FileReader|FontFaceSet|GainNode|Gyroscope|IDBDatabase|IDBTransaction|IIRFilterNode|JavaScriptAudioNode|LinearAccelerationSensor|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|Magnetometer|MediaDevices|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MessagePort|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OrientationSensor|Oscillator|OscillatorNode|PannerNode|PaymentRequest|Performance|PermissionStatus|PresentationAvailability|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RealtimeAnalyserNode|RelativeOrientationSensor|RemotePlayback|ScreenOrientation|ScriptProcessorNode|Sensor|ServiceWorker|ServiceWorkerContainer|ServiceWorkerRegistration|SharedWorker|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|VR|VRDevice|VRDisplay|VRSession|WaveShaperNode|WebSocket|Worker|WorkerPerformance|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;f2|f3|f5|f6"},
aw:{"^":"cI;",$isaw:1,"%":"File"},
ne:{"^":"ky;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaw")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aw]},
$isx:1,
$asx:function(){return[W.aw]},
$asq:function(){return[W.aw]},
$isn:1,
$asn:function(){return[W.aw]},
$isd:1,
$asd:function(){return[W.aw]},
$asu:function(){return[W.aw]},
"%":"FileList"},
nf:{"^":"J;0k:length=","%":"FileWriter"},
ni:{"^":"a3;0k:length=","%":"HTMLFormElement"},
ax:{"^":"i;",$isax:1,"%":"Gamepad"},
nj:{"^":"i;0k:length=","%":"History"},
nk:{"^":"kP;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isE")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.E]},
$isx:1,
$asx:function(){return[W.E]},
$asq:function(){return[W.E]},
$isn:1,
$asn:function(){return[W.E]},
$isd:1,
$asd:function(){return[W.E]},
$asu:function(){return[W.E]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
ip:{"^":"hW;","%":"HTMLDocument"},
bm:{"^":"iq;",
eQ:function(a,b,c,d,e,f){return a.open(b,c)},
ev:function(a,b,c,d){return a.open(b,c,d)},
$isbm:1,
"%":"XMLHttpRequest"},
is:{"^":"j:15;",
$1:function(a){return H.k(a,"$isbm").responseText}},
iu:{"^":"j:16;a,b",
$1:function(a){var z,y,x,w,v
H.k(a,"$isbQ")
z=this.a
y=z.status
if(typeof y!=="number")return y.eG()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.b
if(y){H.bW(z,{futureOr:1,type:H.h(v,0)})
y=v.a
if(y.a!==0)H.N(P.bU("Future already completed"))
y.aL(z)}else v.eb(a)}},
iq:{"^":"J;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
nl:{"^":"a3;0n:height=,0m:width=","%":"HTMLIFrameElement"},
nm:{"^":"i;0n:height=,0m:width=","%":"ImageBitmap"},
ea:{"^":"i;0n:height=,0m:width=",$isea:1,"%":"ImageData"},
nn:{"^":"a3;0n:height=,0m:width=","%":"HTMLImageElement"},
ap:{"^":"a3;0n:height=,0m:width=",$isap:1,"%":"HTMLInputElement"},
bP:{"^":"eJ;",$isbP:1,"%":"KeyboardEvent"},
nu:{"^":"i;",
j:function(a){return String(a)},
"%":"Location"},
iU:{"^":"a3;","%":"HTMLAudioElement;HTMLMediaElement"},
ny:{"^":"i;0k:length=","%":"MediaList"},
nz:{"^":"kW;",
h:function(a,b){return P.a7(a.get(H.r(b)))},
u:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.b,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a7(y.value[1]))}},
gG:function(a){var z=H.l([],[P.b])
this.u(a,new W.iW(z))
return z},
gk:function(a){return a.size},
$asW:function(){return[P.b,null]},
$isD:1,
$asD:function(){return[P.b,null]},
"%":"MIDIInputMap"},
iW:{"^":"j:4;a",
$2:function(a,b){return C.a.l(this.a,a)}},
nA:{"^":"kX;",
h:function(a,b){return P.a7(a.get(H.r(b)))},
u:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.b,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a7(y.value[1]))}},
gG:function(a){var z=H.l([],[P.b])
this.u(a,new W.iX(z))
return z},
gk:function(a){return a.size},
$asW:function(){return[P.b,null]},
$isD:1,
$asD:function(){return[P.b,null]},
"%":"MIDIOutputMap"},
iX:{"^":"j:4;a",
$2:function(a,b){return C.a.l(this.a,a)}},
az:{"^":"i;",$isaz:1,"%":"MimeType"},
nB:{"^":"kZ;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaz")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.az]},
$isx:1,
$asx:function(){return[W.az]},
$asq:function(){return[W.az]},
$isn:1,
$asn:function(){return[W.az]},
$isd:1,
$asd:function(){return[W.az]},
$asu:function(){return[W.az]},
"%":"MimeTypeArray"},
aA:{"^":"eJ;",$isaA:1,"%":"WheelEvent;DragEvent|MouseEvent"},
E:{"^":"J;",
j:function(a){var z=a.nodeValue
return z==null?this.d_(a):z},
bS:function(a,b){return a.appendChild(b)},
$isE:1,
"%":"DocumentFragment|DocumentType|ShadowRoot;Node"},
nI:{"^":"l0;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isE")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.E]},
$isx:1,
$asx:function(){return[W.E]},
$asq:function(){return[W.E]},
$isn:1,
$asn:function(){return[W.E]},
$isd:1,
$asd:function(){return[W.E]},
$asu:function(){return[W.E]},
"%":"NodeList|RadioNodeList"},
nK:{"^":"a3;0n:height=,0m:width=","%":"HTMLObjectElement"},
nM:{"^":"J;0n:height=,0m:width=","%":"OffscreenCanvas"},
nN:{"^":"i;0n:height=,0m:width=","%":"PaintSize"},
aC:{"^":"i;0k:length=",$isaC:1,"%":"Plugin"},
nP:{"^":"l5;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaC")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aC]},
$isx:1,
$asx:function(){return[W.aC]},
$asq:function(){return[W.aC]},
$isn:1,
$asn:function(){return[W.aC]},
$isd:1,
$asd:function(){return[W.aC]},
$asu:function(){return[W.aC]},
"%":"PluginArray"},
nR:{"^":"aA;0n:height=,0m:width=","%":"PointerEvent"},
bQ:{"^":"R;",$isbQ:1,"%":"ProgressEvent|ResourceProgressEvent"},
nW:{"^":"ld;",
h:function(a,b){return P.a7(a.get(H.r(b)))},
u:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.b,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a7(y.value[1]))}},
gG:function(a){var z=H.l([],[P.b])
this.u(a,new W.jy(z))
return z},
gk:function(a){return a.size},
$asW:function(){return[P.b,null]},
$isD:1,
$asD:function(){return[P.b,null]},
"%":"RTCStatsReport"},
jy:{"^":"j:4;a",
$2:function(a,b){return C.a.l(this.a,a)}},
nX:{"^":"i;0n:height=,0m:width=","%":"Screen"},
bs:{"^":"a3;0k:length=",$isbs:1,"%":"HTMLSelectElement"},
aE:{"^":"J;",$isaE:1,"%":"SourceBuffer"},
nZ:{"^":"f3;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaE")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aE]},
$isx:1,
$asx:function(){return[W.aE]},
$asq:function(){return[W.aE]},
$isn:1,
$asn:function(){return[W.aE]},
$isd:1,
$asd:function(){return[W.aE]},
$asu:function(){return[W.aE]},
"%":"SourceBufferList"},
aF:{"^":"i;",$isaF:1,"%":"SpeechGrammar"},
o_:{"^":"lf;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaF")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aF]},
$isx:1,
$asx:function(){return[W.aF]},
$asq:function(){return[W.aF]},
$isn:1,
$asn:function(){return[W.aF]},
$isd:1,
$asd:function(){return[W.aF]},
$asu:function(){return[W.aF]},
"%":"SpeechGrammarList"},
aG:{"^":"i;0k:length=",$isaG:1,"%":"SpeechRecognitionResult"},
jL:{"^":"li;",
h:function(a,b){return this.Y(a,H.r(b))},
u:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.b,P.b]})
for(z=0;!0;++z){y=this.dL(a,z)
if(y==null)return
b.$2(y,this.Y(a,y))}},
gG:function(a){var z=H.l([],[P.b])
this.u(a,new W.jM(z))
return z},
gk:function(a){return a.length},
Y:function(a,b){return a.getItem(b)},
dL:function(a,b){return a.key(b)},
bO:function(a,b,c){return a.setItem(b,c)},
$asW:function(){return[P.b,P.b]},
$isD:1,
$asD:function(){return[P.b,P.b]},
"%":"Storage"},
jM:{"^":"j:18;a",
$2:function(a,b){return C.a.l(this.a,a)}},
aI:{"^":"i;",$isaI:1,"%":"CSSStyleSheet|StyleSheet"},
o3:{"^":"i;0m:width=","%":"TextMetrics"},
aJ:{"^":"J;",$isaJ:1,"%":"TextTrack"},
aK:{"^":"J;",$isaK:1,"%":"TextTrackCue|VTTCue"},
o4:{"^":"ls;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaK")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aK]},
$isx:1,
$asx:function(){return[W.aK]},
$asq:function(){return[W.aK]},
$isn:1,
$asn:function(){return[W.aK]},
$isd:1,
$asd:function(){return[W.aK]},
$asu:function(){return[W.aK]},
"%":"TextTrackCueList"},
o5:{"^":"f6;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaJ")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aJ]},
$isx:1,
$asx:function(){return[W.aJ]},
$asq:function(){return[W.aJ]},
$isn:1,
$asn:function(){return[W.aJ]},
$isd:1,
$asd:function(){return[W.aJ]},
$asu:function(){return[W.aJ]},
"%":"TextTrackList"},
o8:{"^":"i;0k:length=","%":"TimeRanges"},
aL:{"^":"i;",$isaL:1,"%":"Touch"},
o9:{"^":"lx;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaL")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aL]},
$isx:1,
$asx:function(){return[W.aL]},
$asq:function(){return[W.aL]},
$isn:1,
$asn:function(){return[W.aL]},
$isd:1,
$asd:function(){return[W.aL]},
$asu:function(){return[W.aL]},
"%":"TouchList"},
oa:{"^":"i;0k:length=","%":"TrackDefaultList"},
eJ:{"^":"R;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
oe:{"^":"i;",
j:function(a){return String(a)},
"%":"URL"},
oh:{"^":"iU;0n:height=,0m:width=","%":"HTMLVideoElement"},
oi:{"^":"J;0k:length=","%":"VideoTrackList"},
oj:{"^":"J;0n:height=,0m:width=","%":"VisualViewport"},
ok:{"^":"i;0m:width=","%":"VTTRegion"},
dc:{"^":"J;",
cw:function(a,b){H.f(b,{func:1,ret:-1,args:[P.M]})
this.dF(a)
return this.dR(a,W.fk(b,P.M))},
dR:function(a,b){return a.requestAnimationFrame(H.b8(H.f(b,{func:1,ret:-1,args:[P.M]}),1))},
dF:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
e3:function(a,b){return a.alert(b)},
$isdc:1,
$iseL:1,
"%":"DOMWindow|Window"},
eM:{"^":"J;",$iseM:1,"%":"DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
eO:{"^":"E;",$iseO:1,"%":"Attr"},
op:{"^":"lE;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isav")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.av]},
$isx:1,
$asx:function(){return[W.av]},
$asq:function(){return[W.av]},
$isn:1,
$asn:function(){return[W.av]},
$isd:1,
$asd:function(){return[W.av]},
$asu:function(){return[W.av]},
"%":"CSSRuleList"},
oq:{"^":"hX;",
j:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
E:function(a,b){var z
if(b==null)return!1
if(!H.aQ(b,"$isZ",[P.M],"$asZ"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.o(b)
z=a.width===z.gm(b)&&a.height===z.gn(b)}else z=!1
else z=!1
return z},
gv:function(a){return W.eX(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"ClientRect|DOMRect"},
or:{"^":"lG;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isax")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.ax]},
$isx:1,
$asx:function(){return[W.ax]},
$asq:function(){return[W.ax]},
$isn:1,
$asn:function(){return[W.ax]},
$isd:1,
$asd:function(){return[W.ax]},
$asu:function(){return[W.ax]},
"%":"GamepadList"},
os:{"^":"lI;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isE")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.E]},
$isx:1,
$asx:function(){return[W.E]},
$asq:function(){return[W.E]},
$isn:1,
$asn:function(){return[W.E]},
$isd:1,
$asd:function(){return[W.E]},
$asu:function(){return[W.E]},
"%":"MozNamedAttrMap|NamedNodeMap"},
ot:{"^":"lK;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaG")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aG]},
$isx:1,
$asx:function(){return[W.aG]},
$asq:function(){return[W.aG]},
$isn:1,
$asn:function(){return[W.aG]},
$isd:1,
$asd:function(){return[W.aG]},
$asu:function(){return[W.aG]},
"%":"SpeechRecognitionResultList"},
ov:{"^":"lM;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.k(c,"$isaI")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.m(a,b)
return a[b]},
$isv:1,
$asv:function(){return[W.aI]},
$isx:1,
$asx:function(){return[W.aI]},
$asq:function(){return[W.aI]},
$isn:1,
$asn:function(){return[W.aI]},
$isd:1,
$asd:function(){return[W.aI]},
$asu:function(){return[W.aI]},
"%":"StyleSheetList"},
kb:{"^":"cZ;",
u:function(a,b){var z,y,x,w,v,u
H.f(b,{func:1,ret:-1,args:[P.b,P.b]})
for(z=this.gG(this),y=z.length,x=this.a,w=J.o(x),v=0;v<z.length;z.length===y||(0,H.T)(z),++v){u=z[v]
b.$2(u,w.b7(x,u))}},
gG:function(a){var z,y,x,w,v
z=this.a.attributes
y=H.l([],[P.b])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.m(z,w)
v=H.k(z[w],"$iseO")
if(v.namespaceURI==null)C.a.l(y,v.name)}return y},
$asW:function(){return[P.b,P.b]},
$asD:function(){return[P.b,P.b]}},
eT:{"^":"kb;a",
h:function(a,b){return J.bZ(this.a,H.r(b))},
gk:function(a){return this.gG(this).length}},
eS:{"^":"cZ;a",
h:function(a,b){return J.bZ(this.a.a,"data-"+this.aZ(H.r(b)))},
u:function(a,b){this.a.u(0,new W.kk(this,H.f(b,{func:1,ret:-1,args:[P.b,P.b]})))},
gG:function(a){var z=H.l([],[P.b])
this.a.u(0,new W.kl(this,z))
return z},
gk:function(a){return this.gG(this).length},
dZ:function(a,b){var z,y,x
z=H.l(a.split("-"),[P.b])
for(y=1;y<z.length;++y){x=z[y]
if(x.length>0)C.a.i(z,y,x[0].toUpperCase()+J.dM(x,1))}return C.a.U(z,"")},
bQ:function(a){return this.dZ(a,!1)},
aZ:function(a){var z,y,x,w,v
for(z=a.length,y=0,x="";y<z;++y){w=a[y]
v=w.toLowerCase()
x=(w!==v&&y>0?x+"-":x)+v}return x.charCodeAt(0)==0?x:x},
$asW:function(){return[P.b,P.b]},
$asD:function(){return[P.b,P.b]}},
kk:{"^":"j:3;a,b",
$2:function(a,b){if(J.bC(a).bk(a,"data-"))this.b.$2(this.a.bQ(C.e.af(a,5)),b)}},
kl:{"^":"j:3;a,b",
$2:function(a,b){if(J.bC(a).bk(a,"data-"))C.a.l(this.b,this.a.bQ(C.e.af(a,5)))}},
eV:{"^":"aH;a,b,c,$ti",
ab:function(a,b,c,d){var z=H.h(this,0)
H.f(a,{func:1,ret:-1,args:[z]})
H.f(c,{func:1,ret:-1})
return W.bv(this.a,this.b,a,!1,z)}},
eU:{"^":"eV;a,b,c,$ti"},
kt:{"^":"aH;a,b,c,$ti",
ab:function(a,b,c,d){var z,y,x,w
z=H.h(this,0)
H.f(a,{func:1,ret:-1,args:[z]})
H.f(c,{func:1,ret:-1})
y=this.$ti
x=new W.lk(new H.c4(0,0,[[P.aH,z],[P.ah,z]]),y)
x.sdC(new P.lo(null,x.ge9(x),0,y))
for(z=this.a,z=new H.cY(z,z.gk(z),0,[H.h(z,0)]),w=this.c;z.q();)x.l(0,new W.eV(z.d,w,!1,y))
z=x.a
z.toString
return new P.kd(z,[H.h(z,0)]).ab(a,b,c,d)},
er:function(a){return this.ab(a,null,null,null)}},
ku:{"^":"ah;a,b,c,d,e,$ti",
sdM:function(a){this.d=H.f(a,{func:1,args:[W.R]})},
av:function(a){var z,y,x
z=this.b
if(z==null)return
y=this.d
x=y!=null
if(x){H.f(y,{func:1,args:[W.R]})
if(x)J.fS(z,this.c,y,!1)}this.b=null
this.sdM(null)
return},
p:{
bv:function(a,b,c,d,e){var z=W.fk(new W.kv(c),W.R)
if(z!=null&&!0)J.fT(a,b,z,!1)
return new W.ku(0,a,b,z,!1,[e])}}},
kv:{"^":"j:20;a",
$1:[function(a){return this.a.$1(H.k(a,"$isR"))},null,null,4,0,null,16,"call"]},
lk:{"^":"a;0a,b,$ti",
sdC:function(a){this.a=H.p(a,"$ises",this.$ti,"$ases")},
l:function(a,b){var z,y,x
H.p(b,"$isaH",this.$ti,"$asaH")
z=this.b
if(z.M(0,b))return
y=this.a
x=H.h(b,0)
y=H.f(y.ge1(y),{func:1,ret:-1,args:[x]})
H.f(new W.ll(this,b),{func:1,ret:-1})
z.i(0,b,W.bv(b.a,b.b,y,!1,x))},
c4:[function(a){var z,y
for(z=this.b,y=z.geC(z),y=new H.ej(J.aT(y.a),y.b,[H.h(y,0),H.h(y,1)]);y.q();)y.a.av(0)
z.c1(0)
this.a.c4(0)},"$0","ge9",1,0,0]},
ll:{"^":"j:0;a,b",
$0:function(){var z,y
z=this.a
y=z.b.ew(0,H.p(this.b,"$isaH",[H.h(z,0)],"$asaH"))
if(y!=null)y.av(0)
return}},
u:{"^":"a;$ti",
gA:function(a){return new W.ic(a,this.gk(a),-1,[H.bD(this,a,"u",0)])}},
ic:{"^":"a;a,b,c,0d,$ti",
sbE:function(a){this.d=H.t(a,H.h(this,0))},
q:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.sbE(J.bF(this.a,z))
this.c=z
return!0}this.sbE(null)
this.c=y
return!1},
gB:function(a){return this.d},
$isaY:1},
ki:{"^":"a;a",$isJ:1,$iseL:1,p:{
kj:function(a){if(a===window)return H.k(a,"$iseL")
else return new W.ki(a)}}},
kh:{"^":"i+hQ;"},
ko:{"^":"i+q;"},
kp:{"^":"ko+u;"},
kq:{"^":"i+q;"},
kr:{"^":"kq+u;"},
kx:{"^":"i+q;"},
ky:{"^":"kx+u;"},
kO:{"^":"i+q;"},
kP:{"^":"kO+u;"},
kW:{"^":"i+W;"},
kX:{"^":"i+W;"},
kY:{"^":"i+q;"},
kZ:{"^":"kY+u;"},
l_:{"^":"i+q;"},
l0:{"^":"l_+u;"},
l4:{"^":"i+q;"},
l5:{"^":"l4+u;"},
ld:{"^":"i+W;"},
f2:{"^":"J+q;"},
f3:{"^":"f2+u;"},
le:{"^":"i+q;"},
lf:{"^":"le+u;"},
li:{"^":"i+W;"},
lr:{"^":"i+q;"},
ls:{"^":"lr+u;"},
f5:{"^":"J+q;"},
f6:{"^":"f5+u;"},
lw:{"^":"i+q;"},
lx:{"^":"lw+u;"},
lD:{"^":"i+q;"},
lE:{"^":"lD+u;"},
lF:{"^":"i+q;"},
lG:{"^":"lF+u;"},
lH:{"^":"i+q;"},
lI:{"^":"lH+u;"},
lJ:{"^":"i+q;"},
lK:{"^":"lJ+u;"},
lL:{"^":"i+q;"},
lM:{"^":"lL+u;"}}],["","",,P,{"^":"",
a7:function(a){var z,y,x,w,v
if(a==null)return
z=P.V(P.b,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.T)(y),++w){v=H.r(y[w])
z.i(0,v,a[v])}return z},
m5:function(a,b){var z={}
a.u(0,new P.m6(z))
return z},
e1:function(){var z=$.e0
if(z==null){z=J.cB(window.navigator.userAgent,"Opera",0)
$.e0=z}return z},
hV:function(){var z,y
z=$.dY
if(z!=null)return z
y=$.dZ
if(y==null){y=J.cB(window.navigator.userAgent,"Firefox",0)
$.dZ=y}if(y)z="-moz-"
else{y=$.e_
if(y==null){y=!P.e1()&&J.cB(window.navigator.userAgent,"Trident/",0)
$.e_=y}if(y)z="-ms-"
else z=P.e1()?"-o-":"-webkit-"}$.dY=z
return z},
m6:{"^":"j:13;a",
$2:function(a,b){this.a[a]=b}}}],["","",,P,{"^":"",ef:{"^":"i;",$isef:1,"%":"IDBKeyRange"},j4:{"^":"jx;",$isj4:1,"%":"IDBOpenDBRequest|IDBVersionChangeRequest"},jx:{"^":"J;","%":";IDBRequest"},og:{"^":"R;0b5:target=","%":"IDBVersionChangeEvent"}}],["","",,P,{"^":"",
lN:[function(a,b,c,d){var z,y,x
H.cq(b)
H.bd(d)
if(b){z=[c]
C.a.b_(z,d)
d=z}y=P.c5(J.hk(d,P.mo(),null),!0,null)
H.k(a,"$isbl")
x=H.jj(a,y)
return P.dl(x)},null,null,16,0,null,17,18,19,20],
dn:function(a,b,c){var z
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(z){H.at(z)}return!1},
fa:function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return},
dl:[function(a){var z
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=J.C(a)
if(!!z.$isay)return a.a
if(H.fE(a))return a
if(!!z.$isd9)return a
if(!!z.$isan)return H.aD(a)
if(!!z.$isbl)return P.f9(a,"$dart_jsFunction",new P.lO())
return P.f9(a,"_$dart_jsObject",new P.lP($.$get$dm()))},"$1","mp",4,0,2,5],
f9:function(a,b,c){var z
H.f(c,{func:1,args:[,]})
z=P.fa(a,b)
if(z==null){z=c.$1(a)
P.dn(a,b,z)}return z},
f7:[function(a){var z,y
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&H.fE(a))return a
else if(a instanceof Object&&!!J.C(a).$isd9)return a
else if(a instanceof Date){z=H.P(a.getTime())
if(Math.abs(z)<=864e13)y=!1
else y=!0
if(y)H.N(P.am("DateTime is outside valid range: "+z))
return new P.an(z,!1)}else if(a.constructor===$.$get$dm())return a.o
else return P.fj(a)},"$1","mo",4,0,37,5],
fj:function(a){if(typeof a=="function")return P.dp(a,$.$get$c1(),new P.lY())
if(a instanceof Array)return P.dp(a,$.$get$df(),new P.lZ())
return P.dp(a,$.$get$df(),new P.m_())},
dp:function(a,b,c){var z
H.f(c,{func:1,args:[,]})
z=P.fa(a,b)
if(z==null||!(a instanceof Object)){z=c.$1(a)
P.dn(a,b,z)}return z},
ay:{"^":"a;a",
h:["d1",function(a,b){if(typeof b!=="string"&&typeof b!=="number")throw H.c(P.am("property is not a String or num"))
return P.f7(this.a[b])}],
i:["d2",function(a,b,c){if(typeof b!=="string"&&typeof b!=="number")throw H.c(P.am("property is not a String or num"))
this.a[b]=P.dl(c)}],
gv:function(a){return 0},
E:function(a,b){if(b==null)return!1
return b instanceof P.ay&&this.a===b.a},
j:function(a){var z,y
try{z=String(this.a)
return z}catch(y){H.at(y)
z=this.d3(this)
return z}},
e8:function(a,b){var z,y
if(typeof a!=="string"&&!0)throw H.c(P.am("method is not a String or num"))
z=this.a
if(b==null)y=null
else{y=H.h(b,0)
y=P.c5(new H.d_(b,H.f(P.mp(),{func:1,ret:null,args:[y]}),[y,null]),!0,null)}return P.f7(z[a].apply(z,y))},
c_:function(a){return this.e8(a,null)}},
cV:{"^":"ay;a"},
cU:{"^":"kQ;a,$ti",
bA:function(a){var z=a<0||a>=this.gk(this)
if(z)throw H.c(P.aq(a,0,this.gk(this),null,null))},
h:function(a,b){if(typeof b==="number"&&b===C.b.cF(b))this.bA(H.P(b))
return H.t(this.d1(0,b),H.h(this,0))},
i:function(a,b,c){var z
H.t(c,H.h(this,0))
z=C.b.cF(b)
if(b===z)this.bA(b)
this.d2(0,b,c)},
gk:function(a){var z=this.a.length
if(typeof z==="number"&&z>>>0===z)return z
throw H.c(P.bU("Bad JsArray length"))},
$isn:1,
$isd:1},
lO:{"^":"j:2;",
$1:function(a){var z
H.k(a,"$isbl")
z=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(P.lN,a,!1)
P.dn(z,$.$get$c1(),a)
return z}},
lP:{"^":"j:2;a",
$1:function(a){return new this.a(a)}},
lY:{"^":"j:21;",
$1:function(a){return new P.cV(a)}},
lZ:{"^":"j:22;",
$1:function(a){return new P.cU(a,[null])}},
m_:{"^":"j:23;",
$1:function(a){return new P.ay(a)}},
kQ:{"^":"ay+q;"}}],["","",,P,{"^":"",l6:{"^":"a;a,b",
dl:function(a){var z,y,x,w,v,u,t
do{z=(a&4294967295)>>>0
a=C.b.w(a-z,4294967296)
y=(a&4294967295)>>>0
a=C.b.w(a-y,4294967296)
x=((~z&4294967295)>>>0)+(z<<21>>>0)
w=(x&4294967295)>>>0
y=(~y>>>0)+((y<<21|z>>>11)>>>0)+C.b.w(x-w,4294967296)&4294967295
x=((w^(w>>>24|y<<8))>>>0)*265
z=(x&4294967295)>>>0
y=((y^y>>>24)>>>0)*265+C.b.w(x-z,4294967296)&4294967295
x=((z^(z>>>14|y<<18))>>>0)*21
z=(x&4294967295)>>>0
y=((y^y>>>14)>>>0)*21+C.b.w(x-z,4294967296)&4294967295
z=(z^(z>>>28|y<<4))>>>0
y=(y^y>>>28)>>>0
x=(z<<31>>>0)+z
w=(x&4294967295)>>>0
v=C.b.w(x-w,4294967296)
x=this.a*1037
u=(x&4294967295)>>>0
this.a=u
t=(this.b*1037+C.b.w(x-u,4294967296)&4294967295)>>>0
this.b=t
u=(u^w)>>>0
this.a=u
v=(t^y+((y<<31|z>>>1)>>>0)+v&4294967295)>>>0
this.b=v}while(a!==0)
if(v===0&&u===0)this.a=23063
this.P()
this.P()
this.P()
this.P()},
P:function(){var z,y,x,w,v,u
z=this.a
y=4294901760*z
x=(y&4294967295)>>>0
w=55905*z
v=(w&4294967295)>>>0
u=v+x+this.b
z=(u&4294967295)>>>0
this.a=z
this.b=(C.b.w(w-v+(y-x)+(u-z),4294967296)&4294967295)>>>0},
cp:function(a){var z,y,x
if(a<=0||a>4294967296)throw H.c(P.jt("max must be in range 0 < max \u2264 2^32, was "+a))
z=a-1
if((a&z)>>>0===0){this.P()
return(this.a&z)>>>0}do{this.P()
y=this.a
x=y%a}while(y-x+a>=4294967296)
return x},
eu:function(){this.P()
var z=this.a
this.P()
return((z&67108863)*134217728+(this.a&134217727))/9007199254740992},
$isnS:1,
p:{
l7:function(a){var z=new P.l6(0,0)
z.dl(a)
return z}}},l8:{"^":"a;"},Z:{"^":"l8;$ti"}}],["","",,P,{"^":"",hz:{"^":"i;",$ishz:1,"%":"SVGAnimatedLength"},mZ:{"^":"L;0n:height=,0m:width=","%":"SVGFEBlendElement"},n_:{"^":"L;0n:height=,0m:width=","%":"SVGFEColorMatrixElement"},n0:{"^":"L;0n:height=,0m:width=","%":"SVGFEComponentTransferElement"},n1:{"^":"L;0n:height=,0m:width=","%":"SVGFECompositeElement"},n2:{"^":"L;0n:height=,0m:width=","%":"SVGFEConvolveMatrixElement"},n3:{"^":"L;0n:height=,0m:width=","%":"SVGFEDiffuseLightingElement"},n4:{"^":"L;0n:height=,0m:width=","%":"SVGFEDisplacementMapElement"},n5:{"^":"L;0n:height=,0m:width=","%":"SVGFEFloodElement"},n6:{"^":"L;0n:height=,0m:width=","%":"SVGFEGaussianBlurElement"},n7:{"^":"L;0n:height=,0m:width=","%":"SVGFEImageElement"},n8:{"^":"L;0n:height=,0m:width=","%":"SVGFEMergeElement"},n9:{"^":"L;0n:height=,0m:width=","%":"SVGFEMorphologyElement"},na:{"^":"L;0n:height=,0m:width=","%":"SVGFEOffsetElement"},nb:{"^":"L;0n:height=,0m:width=","%":"SVGFESpecularLightingElement"},nc:{"^":"L;0n:height=,0m:width=","%":"SVGFETileElement"},nd:{"^":"L;0n:height=,0m:width=","%":"SVGFETurbulenceElement"},ng:{"^":"L;0n:height=,0m:width=","%":"SVGFilterElement"},nh:{"^":"bK;0n:height=,0m:width=","%":"SVGForeignObjectElement"},ik:{"^":"bK;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bK:{"^":"L;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement;SVGGraphicsElement"},no:{"^":"bK;0n:height=,0m:width=","%":"SVGImageElement"},bn:{"^":"i;",$isbn:1,"%":"SVGLength"},nt:{"^":"kS;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return this.R(a,b)},
i:function(a,b,c){H.k(c,"$isbn")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
R:function(a,b){return a.getItem(b)},
$asq:function(){return[P.bn]},
$isn:1,
$asn:function(){return[P.bn]},
$isd:1,
$asd:function(){return[P.bn]},
$asu:function(){return[P.bn]},
"%":"SVGLengthList"},nv:{"^":"L;0n:height=,0m:width=","%":"SVGMaskElement"},bo:{"^":"i;",$isbo:1,"%":"SVGNumber"},nJ:{"^":"l2;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return this.R(a,b)},
i:function(a,b,c){H.k(c,"$isbo")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
R:function(a,b){return a.getItem(b)},
$asq:function(){return[P.bo]},
$isn:1,
$asn:function(){return[P.bo]},
$isd:1,
$asd:function(){return[P.bo]},
$asu:function(){return[P.bo]},
"%":"SVGNumberList"},nO:{"^":"L;0n:height=,0m:width=","%":"SVGPatternElement"},nQ:{"^":"i;0k:length=","%":"SVGPointList"},nT:{"^":"i;0n:height=,0m:width=","%":"SVGRect"},nU:{"^":"ik;0n:height=,0m:width=","%":"SVGRectElement"},o1:{"^":"ln;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return this.R(a,b)},
i:function(a,b,c){H.r(c)
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
R:function(a,b){return a.getItem(b)},
$asq:function(){return[P.b]},
$isn:1,
$asn:function(){return[P.b]},
$isd:1,
$asd:function(){return[P.b]},
$asu:function(){return[P.b]},
"%":"SVGStringList"},L:{"^":"bk;",
gcr:function(a){return new W.eU(a,"click",!1,[W.aA])},
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},o2:{"^":"bK;0n:height=,0m:width=","%":"SVGSVGElement"},bt:{"^":"i;",$isbt:1,"%":"SVGTransform"},ob:{"^":"lz;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return this.R(a,b)},
i:function(a,b,c){H.k(c,"$isbt")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
R:function(a,b){return a.getItem(b)},
$asq:function(){return[P.bt]},
$isn:1,
$asn:function(){return[P.bt]},
$isd:1,
$asd:function(){return[P.bt]},
$asu:function(){return[P.bt]},
"%":"SVGTransformList"},of:{"^":"bK;0n:height=,0m:width=","%":"SVGUseElement"},kR:{"^":"i+q;"},kS:{"^":"kR+u;"},l1:{"^":"i+q;"},l2:{"^":"l1+u;"},lm:{"^":"i+q;"},ln:{"^":"lm+u;"},ly:{"^":"i+q;"},lz:{"^":"ly+u;"}}],["","",,P,{"^":"",aX:{"^":"a;",$isn:1,
$asn:function(){return[P.F]},
$isd:1,
$asd:function(){return[P.F]},
$isd9:1}}],["","",,P,{"^":"",mH:{"^":"i;0k:length=","%":"AudioBuffer"},mI:{"^":"kc;",
h:function(a,b){return P.a7(a.get(H.r(b)))},
u:function(a,b){var z,y
H.f(b,{func:1,ret:-1,args:[P.b,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a7(y.value[1]))}},
gG:function(a){var z=H.l([],[P.b])
this.u(a,new P.hB(z))
return z},
gk:function(a){return a.size},
$asW:function(){return[P.b,null]},
$isD:1,
$asD:function(){return[P.b,null]},
"%":"AudioParamMap"},hB:{"^":"j:4;a",
$2:function(a,b){return C.a.l(this.a,a)}},mJ:{"^":"J;0k:length=","%":"AudioTrackList"},hC:{"^":"J;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},nL:{"^":"hC;0k:length=","%":"OfflineAudioContext"},kc:{"^":"i+W;"}}],["","",,P,{"^":"",hE:{"^":"i;",$ishE:1,"%":"WebGLBuffer"},ii:{"^":"i;",$isii:1,"%":"WebGLFramebuffer"},js:{"^":"i;",$isjs:1,"%":"WebGLProgram"},nV:{"^":"i;",
bR:function(a,b){return a.activeTexture(b)},
bT:function(a,b,c){return a.attachShader(b,c)},
bU:function(a,b,c){return a.bindBuffer(b,c)},
bV:function(a,b,c){return a.bindFramebuffer(b,c)},
bW:function(a,b,c){return a.bindTexture(b,c)},
bX:function(a,b){return a.blendEquation(b)},
bY:function(a,b,c){return a.blendFunc(b,c)},
bZ:function(a,b,c,d){return a.bufferData(b,c,d)},
c0:function(a,b){return a.checkFramebufferStatus(b)},
c2:function(a,b){return a.clear(b)},
c3:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
c6:function(a,b){return a.compileShader(b)},
c7:function(a){return a.createBuffer()},
c8:function(a){return a.createFramebuffer()},
c9:function(a){return a.createProgram()},
ca:function(a,b){return a.createShader(b)},
cb:function(a){return a.createTexture()},
cc:function(a,b){return a.depthMask(b)},
cd:function(a,b){return a.disable(b)},
ce:function(a,b,c,d){return a.drawArrays(b,c,d)},
cf:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
cg:function(a,b){return a.enable(b)},
ci:function(a,b){return a.enableVertexAttribArray(b)},
ck:function(a,b,c,d,e,f){return a.framebufferTexture2D(b,c,d,e,f)},
az:function(a){return P.a7(a.getContextAttributes())},
b9:function(a){return a.getError()},
ba:function(a,b){return a.getExtension(b)},
bb:function(a,b){return a.getProgramInfoLog(b)},
bc:function(a,b,c){return a.getProgramParameter(b,c)},
be:function(a,b){return a.getShaderInfoLog(b)},
bf:function(a,b,c){return a.getShaderParameter(b,c)},
bg:function(a,b,c){return a.getUniformLocation(b,c)},
cl:function(a,b){return a.linkProgram(b)},
aV:function(a,b,c,d,e,f,g,h){return a.readPixels(b,c,d,e,f,g,h)},
bj:function(a,b,c){return a.shaderSource(b,c)},
bl:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cB:function(a,b,c,d,e,f,g,h,i,j){this.aY(a,b,c,d,e,f,g,h,i,j)
return},
aY:function(a,b,c,d,e,f,g,h,i,j){return a.texImage2D(b,c,d,e,f,g,h,i,j)},
cC:function(a,b,c,d){return a.texParameterf(b,c,d)},
cD:function(a,b,c,d){return a.texParameteri(b,c,d)},
cG:function(a,b,c){return a.uniform1f(b,c)},
cH:function(a,b,c){return a.uniform1i(b,c)},
cI:function(a,b,c){return a.uniform2fv(b,c)},
cJ:function(a,b,c){return a.uniform3fv(b,c)},
cK:function(a,b,c){return a.uniform4fv(b,c)},
cL:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
cM:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
cN:function(a,b){return a.useProgram(b)},
cO:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
cQ:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
cu:function(a,b,c,d,e,f,g,h){this.aV(a,b,c,d,e,f,g,h)},
"%":"WebGLRenderingContext"},d6:{"^":"i;",
e4:function(a,b){return a.beginTransformFeedback(b)},
e7:function(a,b){return a.bindVertexArray(b)},
ef:function(a){return a.createVertexArray()},
eh:function(a,b,c,d,e){return a.drawArraysInstanced(b,c,d,e)},
ei:function(a,b,c,d,e,f){return a.drawElementsInstanced(b,c,d,e,f)},
ej:function(a){return a.endTransformFeedback()},
ey:function(a,b,c,d,e,f){return a.texStorage2D(b,c,d,e,f)},
eA:function(a,b,c,d){this.e_(a,b,H.p(c,"$isd",[P.b],"$asd"),d)
return},
e_:function(a,b,c,d){return a.transformFeedbackVaryings(b,c,d)},
eD:function(a,b,c){return a.vertexAttribDivisor(b,c)},
bR:function(a,b){return a.activeTexture(b)},
bT:function(a,b,c){return a.attachShader(b,c)},
bU:function(a,b,c){return a.bindBuffer(b,c)},
bV:function(a,b,c){return a.bindFramebuffer(b,c)},
bW:function(a,b,c){return a.bindTexture(b,c)},
bX:function(a,b){return a.blendEquation(b)},
bY:function(a,b,c){return a.blendFunc(b,c)},
bZ:function(a,b,c,d){return a.bufferData(b,c,d)},
c0:function(a,b){return a.checkFramebufferStatus(b)},
c2:function(a,b){return a.clear(b)},
c3:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
c6:function(a,b){return a.compileShader(b)},
c7:function(a){return a.createBuffer()},
c8:function(a){return a.createFramebuffer()},
c9:function(a){return a.createProgram()},
ca:function(a,b){return a.createShader(b)},
cb:function(a){return a.createTexture()},
cc:function(a,b){return a.depthMask(b)},
cd:function(a,b){return a.disable(b)},
ce:function(a,b,c,d){return a.drawArrays(b,c,d)},
cf:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
cg:function(a,b){return a.enable(b)},
ci:function(a,b){return a.enableVertexAttribArray(b)},
ck:function(a,b,c,d,e,f){return a.framebufferTexture2D(b,c,d,e,f)},
az:function(a){return P.a7(a.getContextAttributes())},
b9:function(a){return a.getError()},
ba:function(a,b){return a.getExtension(b)},
cU:function(a,b){return a.getParameter(b)},
bb:function(a,b){return a.getProgramInfoLog(b)},
bc:function(a,b,c){return a.getProgramParameter(b,c)},
be:function(a,b){return a.getShaderInfoLog(b)},
bf:function(a,b,c){return a.getShaderParameter(b,c)},
V:function(a,b,c){return a.getShaderPrecisionFormat(b,c)},
bg:function(a,b,c){return a.getUniformLocation(b,c)},
cl:function(a,b){return a.linkProgram(b)},
aV:function(a,b,c,d,e,f,g,h){return a.readPixels(b,c,d,e,f,g,h)},
bj:function(a,b,c){return a.shaderSource(b,c)},
bl:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cB:function(a,b,c,d,e,f,g,h,i,j){this.aY(a,b,c,d,e,f,g,h,i,j)
return},
aY:function(a,b,c,d,e,f,g,h,i,j){return a.texImage2D(b,c,d,e,f,g,h,i,j)},
cC:function(a,b,c,d){return a.texParameterf(b,c,d)},
cD:function(a,b,c,d){return a.texParameteri(b,c,d)},
cG:function(a,b,c){return a.uniform1f(b,c)},
cH:function(a,b,c){return a.uniform1i(b,c)},
cI:function(a,b,c){return a.uniform2fv(b,c)},
cJ:function(a,b,c){return a.uniform3fv(b,c)},
cK:function(a,b,c){return a.uniform4fv(b,c)},
cL:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
cM:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
cN:function(a,b){return a.useProgram(b)},
cO:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
cQ:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
cu:function(a,b,c,d,e,f,g,h){this.aV(a,b,c,d,e,f,g,h)},
$isd6:1,
"%":"WebGL2RenderingContext"},jE:{"^":"i;",$isjE:1,"%":"WebGLShader"},jQ:{"^":"i;",$isjQ:1,"%":"WebGLTexture"},jW:{"^":"i;",$isjW:1,"%":"WebGLUniformLocation"},k3:{"^":"i;",$isk3:1,"%":"WebGLVertexArrayObject"}}],["","",,P,{"^":"",o0:{"^":"lh;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.H(b,a,null,null,null))
return P.a7(this.dK(a,b))},
i:function(a,b,c){H.k(c,"$isD")
throw H.c(P.A("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
dK:function(a,b){return a.item(b)},
$asq:function(){return[[P.D,,,]]},
$isn:1,
$asn:function(){return[[P.D,,,]]},
$isd:1,
$asd:function(){return[[P.D,,,]]},
$asu:function(){return[[P.D,,,]]},
"%":"SQLResultSetRowList"},lg:{"^":"i+q;"},lh:{"^":"lg+u;"}}],["","",,G,{"^":"",
k4:function(a){var z,y,x,w
z=H.l(a.split("\n"),[P.b])
for(y=0;y<z.length;y=x){x=y+1
w=""+x+": "
if(y>=z.length)return H.m(z,y)
C.a.i(z,y,w+H.e(z[y]))}return C.a.U(z,"\n")},
eQ:function(a,b,c){var z,y,x,w
z=J.o(a)
y=z.ca(a,b)
z.bj(a,y,c)
z.c6(a,y)
x=H.cq(z.bf(a,y,35713))
if(x!=null&&!x){w=z.be(a,y)
P.O("E:Compilation failed:")
P.O("E:"+G.k4(c))
P.O("E:Failure:")
P.O(C.e.D("E:",w))
throw H.c(w)}return y},
e8:function(a,b){var z,y,x,w,v
H.p(a,"$isd",[T.X],"$asd")
z=a.length
b=new Float32Array(z*3)
for(y=0;y<a.length;++y){z=y*3
x=J.cF(a[y])
w=b.length
if(z>=w)return H.m(b,z)
b[z]=x
x=z+1
if(y>=a.length)return H.m(a,y)
v=J.cG(a[y])
if(x>=w)return H.m(b,x)
b[x]=v
z+=2
if(y>=a.length)return H.m(a,y)
v=J.dJ(a[y])
if(z>=w)return H.m(b,z)
b[z]=v}return b},
ie:function(a,b){var z,y,x,w
H.p(a,"$isd",[T.a5],"$asd")
z=a.length
b=new Float32Array(z*2)
for(y=0;y<a.length;++y){z=y*2
x=J.cF(a[y])
w=b.length
if(z>=w)return H.m(b,z)
b[z]=x;++z
if(y>=a.length)return H.m(a,y)
x=J.cG(a[y])
if(z>=w)return H.m(b,z)
b[z]=x}return b},
ig:function(a,b){var z,y,x,w,v
H.p(a,"$isd",[T.ci],"$asd")
z=a.length
b=new Float32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
x=J.cF(a[y])
w=b.length
if(z>=w)return H.m(b,z)
b[z]=x
x=z+1
if(y>=a.length)return H.m(a,y)
v=J.cG(a[y])
if(x>=w)return H.m(b,x)
b[x]=v
v=z+2
if(y>=a.length)return H.m(a,y)
x=J.dJ(a[y])
if(v>=w)return H.m(b,v)
b[v]=x
if(y>=a.length)return H.m(a,y)
C.B.i(b,z+3,J.he(a[y]))}return b},
id:function(a,b){var z,y
H.p(a,"$isd",[[P.d,P.w]],"$asd")
z=a.length
b=new Uint32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.r.i(b,z,J.bF(a[y],0))
if(y>=a.length)return H.m(a,y)
C.r.i(b,z+1,J.bF(a[y],1))
if(y>=a.length)return H.m(a,y)
C.r.i(b,z+2,J.bF(a[y],2))
if(y>=a.length)return H.m(a,y)
C.r.i(b,z+3,J.bF(a[y],3))}return b},
kM:function(a,b){var z,y,x,w,v,u,t,s,r,q
for(z=a.e,y=new H.a9(z,[H.h(z,0)]),y=y.gA(y),x=b.x,w=[[P.d,P.w]],v=[P.F],u=[T.ci],t=[T.X],s=[T.a5];y.q();){r=y.d
if(!x.M(0,r)){r="Dropping unnecessary attribute: "+H.e(r)
if($.bB>0)H.be("I: "+r)
continue}q=z.h(0,r)
switch($.$get$a6().h(0,r).a){case"vec2":b.a1(r,G.ie(H.bX(q,"$isd",s,"$asd"),null),2)
break
case"vec3":b.a1(r,G.e8(H.bX(q,"$isd",t,"$asd"),null),3)
break
case"vec4":b.a1(r,G.ig(H.bX(q,"$isd",u,"$asd"),null),4)
break
case"float":b.a1(r,new Float32Array(H.co(H.bX(q,"$isd",v,"$asd"))),1)
break
case"uvec4":b.a1(r,G.id(H.bX(q,"$isd",w,"$asd"),null),4)
break}}},
bJ:function(a,b,c){var z,y,x,w,v,u,t,s
z=b.d
y=b.e.x
x=P.b
w=P.V(x,P.a)
v=J.h1(z.a)
u=new G.iV(z,v,4,w,y,0,-1,P.V(x,P.aX),"meshdata:"+a,!1,!0)
x=G.e8(c.d,null)
w.i(0,"aPosition",J.cC(z.a))
u.ch=x
u.bm("aPosition",x,3)
t=$.$get$a6().h(0,"aPosition")
if(t==null)H.N("Unknown canonical aPosition")
s=y.h(0,"aPosition")
J.bY(z.a,v)
z.cj(0,s,0)
z.cP(0,w.h(0,"aPosition"),s,t.bp(),5126,!1,0,0)
y=H.p(c.d8(),"$isd",[P.w],"$asd")
u.y=J.cC(z.a)
x=u.ch.length
if(x<768){u.saP(new Uint8Array(H.co(y)))
u.Q=5121}else if(x<196608){u.saP(new Uint16Array(H.co(y)))
u.Q=5123}else{u.saP(new Uint32Array(H.co(y)))
u.Q=5125}J.bY(z.a,v)
y=u.y
x=u.cx
J.cA(z.a,34963,y)
J.dG(z.a,34963,x,35048)
G.kM(c,u)
return u},
d0:{"^":"a;"},
aj:{"^":"d0;d,a,b,c",
j:function(a){var z,y,x,w
z=H.l(["{"+new H.bV(H.dA(this)).j(0)+"}["+this.a+"]"],[P.b])
for(y=this.d,x=new H.a9(y,[H.h(y,0)]),x=x.gA(x);x.q();){w=x.d
C.a.l(z,H.e(w)+": "+H.e(y.h(0,w)))}return C.a.U(z,"\n")}},
hG:{"^":"a;0a,b",
cj:function(a,b,c){J.h9(this.a,b)
if(c>0)J.hx(this.a,b,c)},
cP:function(a,b,c,d,e,f,g,h){J.cA(this.a,34962,b)
J.hy(this.a,c,d,e,!1,g,h)}},
c3:{"^":"a;H:a<,an:b<,c,d,e",
ag:function(a,b,c,d,e){var z,y
z=this.a
y=this.b
J.al(z.a,36160,y)
J.bG(z.a,b,c,d,e)
if(a!==0)J.fY(z.a,a)},
p:{
bI:function(a,b,c,d,e){var z,y,x
z=new G.c3(a,null,b,c,d)
y=J.h_(a.a)
z.b=y
J.al(a.a,36160,y)
J.hc(a.a,36160,36064,3553,b.b,0)
x=J.fX(a.a,36160)
if(x!==36053)H.N("Error Incomplete Framebuffer: "+H.e(x))
J.al(a.a,36160,null)
return z}}},
i8:{"^":"a;"},
e5:{"^":"a;a,b,c,d"},
ij:{"^":"a;a,b,c,d,e",
bo:function(a){switch($.$get$a6().h(0,a).a){case"vec2":this.e.i(0,a,H.l([],[T.a5]))
break
case"vec3":this.e.i(0,a,H.l([],[T.X]))
break
case"vec4":this.e.i(0,a,H.l([],[T.ci]))
break
case"float":this.e.i(0,a,H.l([],[P.F]))
break
case"uvec4":this.e.i(0,a,H.l([],[[P.d,P.w]]))
break}},
d5:function(a,b){var z,y,x,w,v,u
z=[T.a5]
H.p(b,"$isd",z,"$asd")
y=H.p(this.e.h(0,a),"$isd",z,"$asd")
for(z=y&&C.a,x=0;x<4;++x){w=b[x]
v=new Float32Array(2)
u=w.a
v[1]=u[1]
v[0]=u[0]
z.l(y,new T.a5(v))}},
d6:function(a,b){var z,y,x,w,v
z=[T.X]
H.p(b,"$isd",z,"$asd")
y=H.p(this.e.h(0,a),"$isd",z,"$asd")
for(z=y&&C.a,x=0;x<4;++x){w=b[x]
v=new T.X(new Float32Array(3))
v.bi(w)
z.l(y,v)}},
d7:function(a){var z,y,x,w,v
H.p(a,"$isd",[T.X],"$asd")
z=this.d
y=z.length
C.a.l(this.c,new G.e5(y,y+1,y+2,y+3))
for(x=0;x<4;++x){w=a[x]
v=new T.X(new Float32Array(3))
v.bi(w)
C.a.l(z,v)}},
d8:function(){var z,y,x,w,v,u,t,s,r
z=this.c
y=new Array(z.length*6)
y.fixed$length=Array
x=H.l(y,[P.w])
for(y=this.b,w=0,v=0;!1;++v){if(v>=0)return H.m(y,v)
u=y[v]
C.a.i(x,w,u.geK(u))
C.a.i(x,w+1,u.geL(u))
C.a.i(x,w+2,u.geM(u))
w+=3}for(y=z.length,v=0;v<z.length;z.length===y||(0,H.T)(z),++v){t=z[v]
s=t.a
C.a.i(x,w,s)
C.a.i(x,w+1,t.b)
r=t.c
C.a.i(x,w+2,r)
C.a.i(x,w+3,s)
C.a.i(x,w+4,r)
C.a.i(x,w+5,t.d)
w+=6}return x},
j:function(a){var z,y,x,w,v
z=H.l(["GB:","V["+this.d.length+"]","f3[0]","f4["+this.c.length+"]"],[P.b])
for(y=this.e,x=new H.a9(y,[H.h(y,0)]),x=x.gA(x);x.q();){w=x.d
v=$.$get$a6().h(0,w).a
C.a.l(z,H.e(w)+"["+v+","+y.h(0,w).length+"]")}return C.a.U(z," ")}},
iV:{"^":"d0;H:d<,e,f,r,x,0y,z,Q,0ch,0cx,cy,a,b,c",
saP:function(a){this.cx=H.p(a,"$isd",[P.w],"$asd")},
bm:function(a,b,c){var z,y
J.cz(a,0)
H.k(b,"$isaX")
this.cy.i(0,a,b)
z=this.d
y=this.r.h(0,a)
J.cA(z.a,34962,y)
J.dG(z.a,34962,b,35048)},
da:function(){var z=this.cx
if(z!=null)return z.length
return this.ch.length/3|0},
a1:function(a,b,c){var z,y,x,w,v
z=J.cz(a,0)===105
if(z&&this.z===0)this.z=C.b.aB(b.length,c)
y=this.r
x=this.d
y.i(0,a,J.cC(x.a))
this.bm(a,b,c)
w=$.$get$a6().h(0,a)
if(w==null)throw H.c("Unknown canonical "+a)
v=this.x.h(0,a)
J.bY(x.a,this.e)
x.cj(0,v,z?1:0)
x.cP(0,y.h(0,a),v,w.bp(),5126,!1,0,0)},
j:function(a){var z,y,x,w
z=this.cx
y=H.l(["Faces:"+(z==null?0:z.length)],[P.b])
for(z=this.cy,x=new H.a9(z,[H.h(z,0)]),x=x.gA(x);x.q();){w=x.d
C.a.l(y,H.e(w)+":"+z.h(0,w).length)}return"MESH["+this.a+"] "+C.a.U(y,"  ")}},
mX:{"^":"a;"},
jw:{"^":"d0;H:d<,e,f,r,x,y,z,Q,0ch,a,b,c",
dd:function(a,b,c,d){var z,y,x,w,v,u,t
for(z=this.e.d,y=z.length,x=this.y,w=this.d,v=this.r,u=0;u<z.length;z.length===y||(0,H.T)(z),++u){t=z[u]
x.i(0,t,J.dL(w.a,v,t))}for(z=this.f.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.T)(z),++u){t=z[u]
x.i(0,t,J.dL(w.a,v,t))}},
di:function(){var z,y,x,w
z=this.z
y=this.y
if(z.a===y.a&&this.Q.a===this.x.a)return H.l([],[P.b])
x=H.l([],[P.b])
for(y=new H.a9(y,[H.h(y,0)]),y=y.gA(y);y.q();){w=y.d
if(!z.M(0,w))C.a.l(x,w)}for(z=this.x,z=P.eY(z,z.r,H.h(z,0)),y=this.Q;z.q();){w=z.d
if(!y.ed(0,w))C.a.l(x,w)}return x},
dj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
H.p(b,"$isD",[P.b,P.a],"$asD")
z=Date.now()
for(y=new H.a9(b,[H.h(b,0)]),y=y.gA(y),x=this.d,w=this.y,v=this.z,u=0;y.q();){t=y.d
switch(J.cz(t,0)){case 117:if(w.M(0,t)){s=b.h(0,t)
if(v.M(0,t))H.be("E:"+(t+" : group ["+a+"] overwrites ["+t+"]"))
v.i(0,t,a)
r=$.$get$a6().h(0,t)
if(r==null)H.N("unknown "+t)
q=w.h(0,t)
t=r.a
switch(t){case"int":if(r.c===0){H.P(s)
J.cH(x.a,q,s)}break
case"float":if(r.c===0){H.dw(s)
J.ht(x.a,q,s)}break
case"mat4":if(r.c===0){t=C.l.gX(H.I(s,"$isnx"))
J.hv(x.a,q,!1,t)}break
case"mat3":if(r.c===0){t=C.l.gX(H.I(s,"$isnw"))
J.hu(x.a,q,!1,t)}break
case"vec4":if(r.c===0){t=C.l.gX(H.I(s,"$isci"))
J.dQ(x.a,q,t)}else{H.k(s,"$isaX")
J.dQ(x.a,q,s)}break
case"vec3":if(r.c===0){t=C.l.gX(H.I(s,"$isX"))
J.dP(x.a,q,t)}else{H.k(s,"$isaX")
J.dP(x.a,q,s)}break
case"vec2":if(r.c===0){t=C.l.gX(H.I(s,"$isa5"))
J.dO(x.a,q,t)}else{H.k(s,"$isaX")
J.dO(x.a,q,s)}break
case"sampler2D":case"sampler2DShadow":t=this.ch
if(typeof t!=="number")return H.a8(t)
J.dE(x.a,33984+t)
t=H.I(s,"$isb3").b
J.au(x.a,3553,t)
t=this.ch
J.cH(x.a,q,t)
t=this.ch
if(typeof t!=="number")return t.D()
this.ch=t+1
break
case"samplerCube":t=this.ch
if(typeof t!=="number")return H.a8(t)
J.dE(x.a,33984+t)
t=H.I(s,"$isb3").b
J.au(x.a,34067,t)
t=this.ch
J.cH(x.a,q,t)
t=this.ch
if(typeof t!=="number")return t.D()
this.ch=t+1
break
default:H.be("Error: unknow uniform type: "+t)}++u}break
case 99:s=b.h(0,t)
switch(t){case"cDepthTest":J.h3(x.a,2929)
break
case"cStencilFunc":H.I(s,"$iso7")
s.gem()
J.cD(x.a,2960)
t=s.gem()
p=C.l.geR(s)
o=s.geP(s)
J.ho(x.a,t,p,o)
break
case"cDepthWrite":H.cq(s)
J.h2(x.a,s)
break
case"cBlendEquation":H.I(s,"$iso6")
s.gek()
J.cD(x.a,3042)
t=s.geH()
p=s.geO()
J.fW(x.a,t,p)
p=s.gek()
J.fV(x.a,p)
break}++u
break}}n=P.hY(0,0,0,Date.now()-new P.an(z,!1).a,0,0)
""+u
n.j(0)},
S:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
H.p(b,"$isd",[G.aj],"$asd")
Date.now()
z=this.d
J.hw(z.a,this.r)
this.ch=0
this.z.c1(0)
for(y=0;y<1;++y){x=b[y]
this.dj(x.a,x.d)}w=this.Q
if(w.a>0){w.f=null
w.e=null
w.d=null
w.c=null
w.b=null
w.a=0
w.bK()}for(v=a.cy,v=new H.a9(v,[H.h(v,0)]),v=v.gA(v);v.q();)w.l(0,v.d)
u=this.di()
if(u.length!==0)P.O("E:"+(this.a+" "+a.f+": uninitialized inputs: "+H.e(u)))
J.bY(a.d.a,a.e)
t=this.e.f.length>0
w=a.f
v=a.da()
s=a.Q
r=a.z
if(t)J.fU(z.a,w)
if(s!==-1){q=z.a
if(r>1)J.h7(q,w,v,s,0,r)
else J.h6(q,w,v,s,0)}else{s=z.a
if(r>1)J.h5(s,w,0,v,r)
else J.h4(s,w,0,v)}if(t)J.ha(z.a)},
a4:function(a,b){return this.S(a,b,null)},
p:{
bS:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=P.b
y=P.ei(null,null,null,z)
x=c.b
w=d.b
v=H.p(c.f,"$isd",[z],"$asd")
u=J.h0(b.a)
t=G.eQ(b.a,35633,x)
J.dF(b.a,u,t)
s=G.eQ(b.a,35632,w)
J.dF(b.a,u,s)
if(v.length>0)J.hr(b.a,u,v,35980)
J.hj(b.a,u)
if(!H.cq(J.hi(b.a,u,35714)))H.N(J.hh(b.a,u))
z=new G.jw(b,c,d,u,P.iJ(c.c,z),P.V(z,P.a),P.V(z,z),y,a,!1,!0)
z.dd(a,b,c,d)
return z}}},
y:{"^":"a;a,b,c",
bp:function(){switch(this.a){case"float":return 1
case"vec2":return 2
case"vec3":case"uvec3":return 3
case"vec4":case"uvec4":return 4
default:return-1}}},
jF:{"^":"a;a,0b,c,d,e,f,r,x",
a2:function(a){var z,y,x,w,v
H.p(a,"$isd",[P.b],"$asd")
for(z=a.length,y=this.c,x=this.x,w=0;w<a.length;a.length===z||(0,H.T)(a),++w){v=a[w]
C.a.l(y,v)
x.i(0,v,this.r);++this.r}C.a.ae(y)},
a3:function(a){var z,y,x
H.p(a,"$isd",[P.b],"$asd")
for(z=a.length,y=this.d,x=0;x<a.length;a.length===z||(0,H.T)(a),++x)C.a.l(y,a[x])
C.a.ae(y)},
ai:function(a){var z,y
H.p(a,"$isd",[P.b],"$asd")
for(z=this.e,y=0;y<1;++y)C.a.l(z,a[y])
C.a.ae(z)},
dh:function(a,b){this.b=this.bs(!0,H.p(a,"$isd",[P.b],"$asd"),b)},
a7:function(a){return this.dh(a,null)},
dg:function(a,b){this.b=this.bs(!1,H.p(a,"$isd",[P.b],"$asd"),b)},
a6:function(a){return this.dg(a,null)},
bs:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=[P.b]
H.p(b,"$isd",z,"$asd")
y=this.c
x=y.length===0
w=H.l(["#version 300 es","precision highp float;","precision highp sampler2DShadow;",""],z)
for(z=y.length,v=this.x,u=0;u<y.length;y.length===z||(0,H.T)(y),++u){t=y[u]
s=$.$get$a6().h(0,t)
C.a.l(w,"layout (location="+H.e(v.h(0,t))+") in "+s.a+" "+H.e(t)+";")}C.a.l(w,"")
r=x?"in":"out"
if(x)C.a.l(w,"out vec4 oFragColor;")
for(z=this.e,y=z.length,u=0;u<z.length;z.length===y||(0,H.T)(z),++u){q=z[u]
s=$.$get$a6().h(0,q)
C.a.l(w,r+" "+s.a+" "+H.e(q)+";")}for(z=this.f,y=z.length,u=0;u<z.length;z.length===y||(0,H.T)(z),++u){q=z[u]
s=$.$get$a6().h(0,q)
C.a.l(w,r+" "+s.a+" "+H.e(q)+";")}C.a.l(w,"")
for(z=this.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.T)(z),++u){q=z[u]
s=$.$get$a6().h(0,q)
v=s.c
p=v===0?"":"["+v+"]"
C.a.l(w,"uniform "+s.a+" "+H.e(q)+p+";")}C.a.l(w,"")
if(a)C.a.l(w,"void main(void) {")
C.a.b_(w,b)
if(a)C.a.l(w,"}")
return C.a.U(w,"\n")},
p:{
ag:function(a){var z,y
z=P.b
y=[z]
return new G.jF(a,H.l([],y),H.l([],y),H.l([],y),H.l([],y),0,P.V(z,P.w))}}},
jR:{"^":"a;a,b,c,d,e,f,r",
bq:function(a,b){var z=this.e
if(z!==1)J.hp(a.a,b,34046,z)
z=this.r
J.c_(a.a,b,10240,z)
z=this.f
J.c_(a.a,b,10241,z)
if(this.b){J.c_(a.a,b,10242,33071)
J.c_(a.a,b,10243,33071)}}},
b3:{"^":"a;H:d<",
j:function(a){return"Texture["+this.a+", "+this.c+"]"}},
jV:{"^":"b3;f,r,x,a,b,c,d,e",
j:function(a){return"TypedTexture["+this.a+", "+this.x+", "+this.f+" X "+this.r+"]"},
p:{
ch:function(a,b,c,d,e,f){var z=J.dI(a.a)
J.au(a.a,3553,z)
J.hq(a.a,3553,1,e,c,d)
f.bq(a,3553)
J.dK(a.a)
J.au(a.a,3553,null)
return new G.jV(c,d,e,b,z,3553,a,f)}}},
da:{"^":"b3;f,r,x,a,b,c,d,e",
aF:function(a,b,c){var z,y
z=this.d
y=this.c
J.au(z.a,y,this.b)
J.dN(z.a,3553,0,this.x,this.f,this.r,0,b,c,a)
J.au(z.a,y,null)},
j:function(a){return"TypedTextureMutable["+this.a+", "+this.x+", "+this.f+" X "+this.r+"]"},
p:{
eI:function(a,b,c,d,e,f,g,h,i){var z=J.dI(a.a)
J.au(a.a,3553,z)
J.dN(a.a,3553,0,e,c,d,0,g,h,i)
f.bq(a,3553)
J.dK(a.a)
J.au(a.a,3553,null)
return new G.da(c,d,e,b,z,3553,a,f)}}}}],["","",,B,{"^":"",
bR:function(a){var z,y,x,w,v,u,t,s,r,q
z=-1*a
y=new T.X(new Float32Array(3))
y.a0(z,z,0)
x=new T.X(new Float32Array(3))
x.a0(a,z,0)
w=new T.X(new Float32Array(3))
w.a0(a,a,0)
v=new T.X(new Float32Array(3))
v.a0(z,a,0)
z=[T.X]
u=H.l([y,x,w,v],z)
y=new T.a5(new Float32Array(2))
y.ad(0,0)
x=new T.a5(new Float32Array(2))
x.ad(1,0)
w=new T.a5(new Float32Array(2))
w.ad(1,1)
v=new T.a5(new Float32Array(2))
v.ad(0,1)
t=H.l([y,x,w,v],[T.a5])
s=new T.X(new Float32Array(3))
s.a0(0,0,1)
r=H.l([s,s,s,s],z)
q=new G.ij(!1,H.l([],[G.i8]),H.l([],[G.e5]),H.l([],z),P.V(P.b,[P.d,,]))
q.bo("aTexUV")
q.d7(u)
q.d5("aTexUV",t)
q.bo("aNormal")
q.d6("aNormal",r)
return q}}],["","",,A,{"^":"",
fD:function(a){var z,y
z=C.B.el(H.p(a,"$isn",[P.a],"$asn"),0,new A.me(),P.w)
if(typeof z!=="number")return H.a8(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
me:{"^":"j:24;",
$2:function(a,b){var z,y
H.P(a)
z=J.aS(b)
if(typeof a!=="number")return a.D()
y=536870911&a+z
y=536870911&y+((524287&y)<<10)
return y^y>>>6}}}],["","",,T,{"^":"",a5:{"^":"a;a",
gX:function(a){return this.a},
ad:function(a,b){var z=this.a
z[0]=a
z[1]=b},
j:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+"]"},
E:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.a5){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gv:function(a){return A.fD(this.a)},
h:function(a,b){var z=this.a
if(b>=2)return H.m(z,b)
return z[b]},
gk:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
gcR:function(a){return this.a[0]},
gcS:function(a){return this.a[1]}},X:{"^":"a;a",
gX:function(a){return this.a},
a0:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c},
bi:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
j:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+"]"},
E:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.X){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gv:function(a){return A.fD(this.a)},
h:function(a,b){var z=this.a
if(b>=3)return H.m(z,b)
return z[b]},
gk:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(y*y+x*x+z*z)},
gcR:function(a){return this.a[0]},
gcS:function(a){return this.a[1]},
geE:function(a){return this.a[2]}},ci:{"^":"a;"}}],["","",,S,{"^":"",
jZ:function(a,b){var z=a>=0?a:-1
if(z===0)return 1
else if(z*4===b)return 0
else if(z*2===b)return-1
else if(z*3===b*2)return 0
else if(z===b)return 1
return Math.cos(6.283185307179586*a/b)},
jY:function(a,b){var z=a>=0?a:-1
if(z===0)return 0
else if(z*4===b)return 1
else if(z*2===b)return 0
else if(z*3===b*2)return-1
else if(z===b)return 0
return Math.sin(6.283185307179586*a/b)},
dS:function(a,b){var z
for(z=0;b!==0;){z=(z<<1|a&1)>>>0
a=a>>>1
b=b>>>1}return z},
cN:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
H.p(d,"$isd",[S.bp],"$asd")
if(b===1)return
z=C.b.w(b,2)
S.cN(a,z,c,d)
y=c+z
S.cN(a,z,y,d)
for(x=b===2,w=0;w<z;++w){v=c+w
u=y+w
if(x){t=C.b.w(a,2)
s=S.dS(v,t)
r=S.dS(u,t)}else{r=u
s=v}C.a.l(d,new S.bp(b,v,!1,s,r,w))
C.a.l(d,new S.bp(b,u,!0,s,r,w))}},
iL:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=H.l([],[P.aX])
y=H.l([],[S.bp])
S.cN(a,a,0,y)
C.a.ae(y)
for(x=y.length,w=4*a,v=null,u=-1,t=0;t<y.length;y.length===x||(0,H.T)(y),++t){s=y[t]
r=s.a
if(r!==u){v=new Float32Array(w)
C.a.l(z,v)
u=r}q=s.c?-1:1
p=s.f
if(b)p=-p
o=s.b*4
n=v.length
if(o>=n)return H.m(v,o)
v[o]=s.d
m=o+1
if(m>=n)return H.m(v,m)
v[m]=s.e
m=o+2
l=S.jZ(p,r)
if(m>=n)return H.m(v,m)
v[m]=q*l
l=o+3
m=S.jY(p,r)
if(l>=n)return H.m(v,l)
v[l]=q*m}return z},
d4:function(a,b,c){var z
H.dw(b)
if(typeof c!=="number")return c.eF()
z=c/2
if(typeof a!=="number")return a.eI()
if(typeof b!=="number")return b.K()
if(b<a-z)return 1
if(b>a+z)return 0
return 0.5+(a-b)/c},
mS:[function(a,b){return Math.abs(a)+Math.abs(b)},"$2","m9",8,0,12],
mR:[function(a,b){return Math.sqrt(a*a+b*b)},"$2","m8",8,0,12],
iM:function(a,b,c,d,e,f){var z,y,x,w,v
H.f(f,{func:1,ret:P.F,args:[P.F,P.F]})
z=new Float32Array(c*a*b)
y=new S.iN(z,c,a)
for(x=0;x<b;++x){w=x<C.b.w(b,2)?x:x-b
for(v=0;v<a;++v)y.$3(v,x,S.d4(d,f.$2(v<C.b.w(a,2)?v:v-a,w),e))}return z},
iO:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q
H.f(g,{func:1,ret:P.F,args:[P.F,P.F]})
z=new Float32Array(c*a*b)
for(y=z.length,x=0;x<b;++x){w=x<C.b.w(b,2)?x:x-b
for(v=x*a,u=0;u<a;++u){t=g.$2(u<C.b.w(a,2)?u:u-a,w)
s=S.d4(d,t,f)
if(s===0)continue
r=S.d4(e,t,f)
q=c*(v+u)
if(q>=y)return H.m(z,q)
z[q]=s*(1-r)}}return z},
iP:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=new Float32Array(d*b*c)
for(y=b-1,x=c-1,w=z.length,v=0;v<e;++v){u=a.cp(b)
t=a.cp(c)
s=a.eu()
if(typeof f!=="number")return f.W()
r=f*(0.5+0.5*s)
q=r*r
p=1+C.n.aw(r)
for(o=Math.max(0,u-p),s=Math.min(u+p,y),n=t-p,m=t+p;o<s;++o)for(l=Math.max(0,n),k=Math.min(m,x),j=u-o,j*=j;l<k;++l){i=t-l
if(j+i*i<=q){i=d*(l*b+o)
if(i<0||i>=w)return H.m(z,i)
z[i]=1}}}return z},
eu:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x)y+=a[x]
return y},
bp:{"^":"a;a,b,c,d,e,f",
T:function(a,b){var z,y
H.k(b,"$isbp")
z=b.a
y=this.a
if(z!==y)return y-z
return this.b-b.b},
j:function(a){var z="["+this.a+"] "+this.b+" = "+this.d+" "
return z+(this.c?"-":"+")+" "+this.e+" * root("+this.f+")"},
$isU:1,
$asU:function(){return[S.bp]}},
iN:{"^":"j:38;a,b,c",
$3:function(a,b,c){var z,y
z=this.a
y=this.b*(b*this.c+a)
if(y>=z.length)return H.m(z,y)
z[y]=c}}}],["","",,F,{}],["","",,O,{"^":"",
c6:function(a,b,c,d){var z,y,x,w,v
N.K("Creating gpu ops "+b+" "+c)
z=S.iL(b,c)
y=H.l([],[G.b3])
for(x=0;x<z.length;++x){w=d+"-"+x+"-"+c
v=$.$get$cf()
if(x>=z.length)return H.m(z,x)
C.a.l(y,G.eI(a,w,b,1,34836,v,6408,5126,z[x]))}return y},
i9:{"^":"a;a,b,0c",
S:function(a,b,c){var z,y
N.b_("FftCol")
z=this.b
y=z.d
y.i(0,"uTexture2",a)
y.i(0,"uTexture",b)
y.i(0,"uFactor",1/c)
this.a.a4(this.c,H.l([z],[G.aj]))},
p:{
e6:function(a){var z,y
z=G.bS("fftcol",a,$.$get$ft(),$.$get$fr())
y=new O.i9(z,new G.aj(P.V(P.b,P.a),"fftcol",!1,!0))
y.c=G.bJ("quad",z,B.bR(1))
return y}}},
ia:{"^":"a;a,b,0c",
S:function(a,b,c){var z,y
N.b_("FftRow")
z=this.b
y=z.d
y.i(0,"uTexture2",a)
y.i(0,"uTexture",b)
y.i(0,"uFactor",1/c)
this.a.a4(this.c,H.l([z],[G.aj]))},
p:{
e7:function(a){var z,y
z=G.bS("fftrow",a,$.$get$fu(),$.$get$fs())
y=new O.ia(z,new G.aj(P.V(P.b,P.a),"fftrow",!1,!0))
y.c=G.bJ("quad",z,B.bR(1))
return y}}},
i5:{"^":"a;a,b,c,d,e,f,r,x,0y,0z",
aD:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o
N.b_("Run Encode")
z=this.a
y=this.b
x=new O.i6(this,c)
w=new O.i7(this,z.length+y.length-1,b)
for(v=this.e,u=this.r,t=this.x,s=0;s<z.length;++s){r=w.$1(s)
q=r.gH()
p=r.gan()
J.al(q.a,36160,p)
J.bG(r.gH().a,0,0,u,t)
if(s>=z.length)return H.m(z,s)
v.S(z[s],x.$1(s),1)}for(v=this.f,s=0;s<y.length;++s){o=s+z.length
r=w.$1(o)
q=r.gH()
p=r.gan()
J.al(q.a,36160,p)
J.bG(r.gH().a,0,0,u,t)
if(s>=y.length)return H.m(y,s)
v.S(y[s],x.$1(o),1)}},
O:function(a,b,c){return this.aD(a,b,c,!1)}},
i6:{"^":"j:11;a,b",
$1:function(a){if(a===0)return this.b
if((a&1)===0)return this.a.c
return this.a.d}},
i7:{"^":"j:10;a,b,c",
$1:function(a){if(a===this.b)return this.c
if((a&1)===0)return this.a.z
return this.a.y}},
i2:{"^":"a;a,b,c,d,e,f,r,x,0y,0z",
aD:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
N.b_("Run Decode")
z=this.a
y=this.b
x=new O.i3(this,c)
w=new O.i4(this,z.length+y.length-1,b)
for(v=this.f,u=this.r,t=this.x,s=0;s<y.length;++s){r=w.$1(s)
q=r.gH()
p=r.gan()
J.al(q.a,36160,p)
J.bG(r.gH().a,0,0,u,t)
r=y.length
o=s===r-1?t:1
if(s>=r)return H.m(y,s)
v.S(y[s],x.$1(s),o)}for(v=this.e,s=0;s<z.length;++s){n=s+y.length
r=w.$1(n)
q=r.gH()
p=r.gan()
J.al(q.a,36160,p)
J.bG(r.gH().a,0,0,u,t)
r=z.length
o=s===r-1?u:1
if(s>=r)return H.m(z,s)
v.S(z[s],x.$1(n),o)}},
O:function(a,b,c){return this.aD(a,b,c,!1)}},
i3:{"^":"j:11;a,b",
$1:function(a){if(a===0)return this.b
if((a&1)===0)return this.a.c
return this.a.d}},
i4:{"^":"j:10;a,b,c",
$1:function(a){if(a===this.b)return this.c
if((a&1)===0)return this.a.z
return this.a.y}},
ib:{"^":"a;a,b,0c"},
iY:{"^":"a;a,b,0c",
O:function(a,b,c){var z,y
N.b_("Run Multiply")
z=this.b
y=z.d
y.i(0,"uTexture",b)
y.i(0,"uTexture2",c)
this.a.a4(this.c,H.l([z],[G.aj]))}},
iG:{"^":"a;0a,0b,0c,0d,e,f,0r,0x",
j:function(a){return H.e(this.e)+" ["+H.e(this.a)+" "+H.e(this.b)+"] ["+H.e(this.c)+" "+H.e(this.d)+"]"},
p:{
eg:function(a,b,c,d){var z=new O.iG(0.5,0.1)
z.a=a
z.b=b
z.c=c
z.d=d
return z}}},
jB:{"^":"a;a,b,0c"}}],["","",,N,{"^":"",
ar:function(a){if(a>=10)return""+a
return"0"+a},
de:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
cm:function(a){var z=new P.an(Date.now(),!1)
return a+":"+N.ar(H.c8(z))+":"+N.ar(H.ca(z))+":"+N.ar(H.cb(z))+"."+N.de(H.c9(z))+": "},
K:function(a){var z=$.bA
if(typeof z!=="number")return z.J()
if(z>0)P.O(N.cm("I")+a)},
b_:function(a){var z=$.bA
if(typeof z!=="number")return z.J()
if(z>1)P.O(N.cm("D")+a)}}],["","",,S,{"^":"",
jd:function(){var z,y,x,w,v,u,t
z=C.a.U(H.l(["art","muth","org"],[P.b]),".")
y=window.location.host
x=window.location.pathname
w=W.ir(C.e.D(C.e.D("http://"+z+"/",y)+"/",x),null,null).b6(new S.je(),-1)
v=new S.jf()
u=H.h(w,0)
t=$.B
if(t!==C.d)v=P.fd(v,t)
w.aK(new P.aN(new P.a0(0,t,[u]),2,null,v,[u,u]))},
je:{"^":"j:28;",
$1:function(a){H.r(a)
return P.O("")}},
jf:{"^":"j:5;",
$1:[function(a){P.O(J.bh(a))},null,null,4,0,null,1,"call"]},
bq:{"^":"a;a,b,c,d",
a5:function(){var z,y
z=this.d
if(z==="B")return J.bh(H.I(this.a,"$isap").checked)
else{y=this.a
if(z==="O")return H.I(y,"$isbs").value
else return H.I(y,"$isap").value}},
ak:function(a){var z,y
z=this.d
if(z==="B")H.I(this.a,"$isap").checked=a==="true"
else{y=this.a
if(z==="O")H.I(y,"$isbs").value=a
else H.I(y,"$isap").value=a}},
aj:function(a){var z,y
z=this.c
N.K("Saving "+z+" "+H.e(a))
y=window.localStorage;(y&&C.m).bO(y,z,a)
y=window.localStorage
P.O("@@SAVED "+H.e((y&&C.m).Y(y,z)))}},
j5:{"^":"a;a,b,c",
aC:function(a,b,c,d){var z,y,x,w,v
z="#"+a
y=C.c.C(document,z)
if(y==null&&d){y=W.iw(null)
y.type=$.$get$fc().h(0,b)}if(y==null)throw H.c("Missing widget for options "+a)
z=this.a+":"+a
x=new S.bq(y,c,z,b)
w=window.localStorage
if((w&&C.m).Y(w,z)==null)x.aj(c)
w=window.localStorage
v=(w&&C.m).Y(w,z)
N.K("Loading "+z+" -> ["+H.e(v)+"]")
x.ak(v)
this.b.i(0,a,x)},
F:function(a,b,c){return this.aC(a,b,c,!1)},
aG:function(a,b){var z=this.b
if(!z.M(0,a))throw H.c("unknown options "+a)
if(z.h(0,a).d!==b)throw H.c("bad type "+b+" for options "+a)},
d9:function(a){var z,y
this.aG(a,"I")
z=this.b
y=H.I(z.h(0,a).a,"$isap").valueAsNumber
if(typeof y!=="number")return y.W()
if(isNaN(y))return P.ml(z.h(0,a).b,null,null)
return C.n.aw(y)},
L:function(a){var z,y
this.aG(a,"D")
z=this.b
y=H.I(z.h(0,a).a,"$isap").valueAsNumber
if(typeof y!=="number")return y.W()
if(isNaN(y))return P.fq(z.h(0,a).b,null)
return y},
aE:function(){this.b.u(0,new S.ja())},
br:function(a){var z
H.r(a)
if(a==="reset"){this.de()
return}z=this.c
if(!z.M(0,a)){z="Unknown Setting ["+H.e(a)+"]"
P.O(N.cm("E")+z)
return}N.K("Setting "+H.e(a))
z.h(0,a).u(0,new S.jb(this))
window.location.hash=C.e.D("#",a)},
df:function(a,b){var z
H.r(a)
H.r(b)
z=this.b
z.h(0,a).aj(b)
z.h(0,a).ak(b)},
ah:function(a,b){var z=P.b
H.p(b,"$isD",[z,z],"$asD")
b.u(0,new S.j8(this,a))
this.c.i(0,a,b)},
de:function(){this.b.u(0,new S.j9(this))},
dc:function(){var z,y,x,w,v,u,t,s,r,q,p,o
S.jd()
z=window.location.hash
if(z==="")return
y=J.dM(z,1).split("&")
for(x=y.length,w=this.b,v=0;v<x;++v){u=J.hn(y[v],"=")
t=u.length
if(t===1){if(0>=t)return H.m(u,0)
t="SetSetting "+H.e(u[0])
s=$.bA
if(typeof s!=="number")return s.J()
if(s>0){r=new P.an(Date.now(),!1)
H.be("I:"+N.ar(H.c8(r))+":"+N.ar(H.ca(r))+":"+N.ar(H.cb(r))+"."+N.de(H.c9(r))+": "+t)}if(0>=u.length)return H.m(u,0)
this.br(u[0])}else if(t===2){if(0>=t)return H.m(u,0)
s=u[0]
if(1>=t)return H.m(u,1)
t=u[1]
H.r(s)
H.r(t)
q=w.h(0,s).c
p="Saving "+q+" "+H.e(t)
o=$.bA
if(typeof o!=="number")return o.J()
if(o>0){r=new P.an(Date.now(),!1)
H.be("I:"+N.ar(H.c8(r))+":"+N.ar(H.ca(r))+":"+N.ar(H.cb(r))+"."+N.de(H.c9(r))+": "+p)}p=window.localStorage;(p&&C.m).bO(p,q,t)
p=window.localStorage
H.be("@@SAVED "+H.e((p&&C.m).Y(p,q)))
w.h(0,s).ak(t)}}}},
ja:{"^":"j:9;",
$2:function(a,b){H.r(a)
H.k(b,"$isbq")
b.aj(b.a5())}},
jb:{"^":"j:3;a",
$2:function(a,b){var z
H.r(a)
H.r(b)
N.K("["+H.e(a)+"] "+H.e(a)+" -> "+H.e(b))
z=this.a.b
z.h(0,a).aj(b)
z.h(0,a).ak(b)}},
j8:{"^":"j:3;a,b",
$2:function(a,b){H.r(a)
H.r(b)
if(!this.a.b.M(0,a))throw H.c("missing setting "+H.e(a)+" in "+this.b)}},
j9:{"^":"j:9;a",
$2:function(a,b){var z,y
H.r(a)
H.k(b,"$isbq")
z="reset "+H.e(a)+" "
y=b.b
P.O(z+y)
this.a.df(a,y)}}}],["","",,U,{"^":"",
cP:function(a,b){var z,y
N.K("HandleCommand: "+H.e(a)+" "+H.e(b))
switch(a){case"A":z=C.c.C(document,".about")
z.hidden=!z.hidden
break
case"C":z=C.c.C(document,".config")
z.hidden=!z.hidden
$.G.aE()
break
case"P":z=C.c.C(document,".performance")
z.hidden=!z.hidden
break
case"R":$.G.aE()
window.location.hash=""
window.location.reload()
break
case"A+":C.c.C(document,".about").hidden=!1
break
case"A-":C.c.C(document,".about").hidden=!0
break
case"F":R.jT()
break
case"C-":C.c.C(document,".config").hidden=!0
$.G.aE()
break
case"C+":C.c.C(document,".config").hidden=!1
break
case"X":y=H.I(C.c.C(document,"#preset"),"$isbs").value
$.G.br(y)
U.db()
break
default:break}},
S:function(a,b,c,d,e){var z=P.b
$.G.ah(a,P.a4(["radInner","8.0","radOuter","24.0","antiAliasing","1.0","birthLo",C.j.j(b),"birthHi",C.j.j(c),"deathLo",C.j.j(d),"deathHi",C.j.j(e),"stableThreshold","0.0"],z,z))},
d3:function(a,b,c,d,e,f){var z=P.b
$.G.ah(a,P.a4(["radInner","4.0","radOuter","12.0","antiAliasing","1.0","birthLo",C.j.j(b),"birthHi",C.j.j(c),"deathLo",C.j.j(d),"deathHi",C.j.j(e),"stableThreshold","0.0"],z,z))},
j6:function(){var z,y,x,w
z=P.b
y=new S.j5("smoothlife",P.V(z,S.bq),P.V(z,[P.D,P.b,P.b]))
y.F("speed","D","0.1")
y.F("radInner","D","4.0")
y.F("radOuter","D","12.0")
y.F("antiAliasing","D","1.0")
y.F("birthLo","D","0.254")
y.F("birthHi","D","0.312")
y.F("deathLo","D","0.340")
y.F("deathHi","D","0.518")
y.F("colorMode","O","2.0")
y.F("neighborhoodShape","O","circle")
y.F("randomSeed","I","0")
y.F("resolution","O","lo")
y.F("stableThreshold","D","0.02")
y.aC("hideAbout","B","false",!0)
y.aC("logLevel","I","0",!0)
$.G=y
y.ah("TissueWars",P.a4(["radInner","4.0","radOuter","8.0","antiAliasing","1.0","birthLo","0.271","birthHi","0.334","deathLo","0.438","deathHi","0.83","stableThreshold","0.04"],z,z))
$.G.ah("Larvae",P.a4(["radInner","8.0","radOuter","24.0","antiAliasing","1.0","birthLo","0.271","birthHi","0.584","deathLo","0.622","deathHi","0.811","stableThreshold","0.01"],z,z))
U.S("GlidersAndWires2",0.254,0.312,0.34,0.518)
U.S("GlidersGalore",0.254,0.312,0.34,0.518)
U.d3("Honeycombs",0.279,0.397,0.428,0.628,"2.0")
U.d3("WobbleGliders",0.251,0.302,0.321,0.514,"2.0")
U.S("BlinkingEyes",0.274,0.292,0.233,0.443)
U.S("Fruitcake",0.336,0.377,0.365,0.799)
U.d3("Maze",0.219,0.283,0.299,0.508,"2.0")
U.S("DisappearingFruitcake",0.206,0.246,0.367,0.666)
U.S("WiresToCrossOrHexagon",0.247,0.314,0.365,0.549)
U.S("Islands",0.091,0.106,0.365,0.77)
U.S("WormsWithLoops",0.264,0.291,0.275,0.604)
U.S("NestOfWorms",0.212,0.244,0.222,0.397)
U.S("Fishies",0.218,0.248,0.225,0.328)
U.S("PolkaDots",0.257,0.3,0.001,0.284)
U.S("PolkaDotsFast",0.257,0.325,0.001,0.284)
U.S("WormsWithWorms",0.281,0.579,0.614,0.795)
U.S("SinglesAndCouples",0.298,0.311,0.25,0.462)
U.S("TouchAndGo",0.2,0.214,0.148,0.335)
U.S("Smooth Glider",0.278,0.365,0.267,0.445)
$.G.dc()
z=document
x=H.k(C.c.C(z,"#preset"),"$isbs");(x&&C.D).bS(x,W.en("GlidersAndWires","reset",null,!1))
for(y=$.G.c,y=new H.a9(y,[H.h(y,0)]),y=y.gA(y);y.q();){w=y.d
C.D.bS(x,W.en(w,w,null,!1))}$.bA=$.G.d9("logLevel")
C.c.C(z,".about").hidden=!1
z=$.G
z.aG("hideAbout","B")
if(z.b.h(0,"hideAbout").a5()==="true")P.jS(C.L,new U.j7())},
b0:function(a,b,c){var z="Texture "+b+"x"+c
if($.bB>0)P.O("I: "+z)
return G.bI(a,G.eI(a,"plane",b,c,33328,$.$get$cf(),33319,5126,null),null,null,!1)},
db:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=$.G.L("radOuter")
y=$.G.L("radInner")
x=$.G.L("antiAliasing")
w=$.G.b.h(0,"neighborhoodShape").a5()==="square"?S.m9():S.m8()
v=$.ac
v.toString
H.f(w,{func:1,ret:P.F,args:[P.F,P.F]})
u=v.b
t=v.c
s=S.iM(u,t,2,y,x,w)
r=v.fx
r.x=S.eu(s)
N.K("Compute fftKernelDisk")
q=H.I(v.z.c,"$isda")
q.aF(s,33319,5126)
p=v.ch
o=v.a
p.O(o,v.x,q)
n=S.iO(u,t,2,z,y,x,w)
r.r=S.eu(n)
N.K("Compute fftKernelRing")
q.aF(n,33319,5126)
p.O(o,v.y,q)
q=$.ac
v=$.$get$fA()
o=$.G.L("radOuter")
q.toString
if(typeof o!=="number")return H.a8(o)
u=2*o
t=q.c
m=u<t?C.b.aB(t,C.n.aw(u)):1
r=q.b
if(u<r)m*=C.b.aB(r,C.n.aw(u))
N.K("creating "+m+" splats of radius "+H.e(o))
l=S.iP(v,r,t,2,m,o)
H.I(q.dy.c,"$isda").aF(l,33319,5126)},
jG:function(a,b){var z,y,x,w,v,u
for(z=a.length,y=b.length,x=0,w=0;w<z;++w){v=a[w]
if(w>=y)return H.m(b,w)
u=v-b[w]
if((u<0?-u:u)>1)++x}return x/z},
fG:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z={}
$.bA=1
if(!R.il()){C.v.e3(window,"no webgl2 support")
return}U.j6()
y=document
x=y.body
x.toString
w=W.bP
W.bv(x,"keydown",H.f(new U.mt(),{func:1,ret:-1,args:[w]}),!1,w)
w=y.body
x=W.bk
w.toString
H.m0(x,x,"The type argument '","' is not a subtype of the type variable bound '","' of type variable 'T' in 'querySelectorAll'.")
w=(w&&C.I).dO(w,"button")
N.K("found "+w.length+" buttons")
new W.kt(H.p(new W.kz(w,[x]),"$ise3",[x],"$ase3"),!1,"click",[W.aA]).er(new U.mu())
x=J.hd(C.c.C(y,"#area"))
w=H.h(x,0)
W.bv(x.a,x.b,H.f(new U.mv(),{func:1,ret:-1,args:[w]}),!1,w)
v=H.k(C.c.C(y,"#area"),"$iscL")
u=new G.hG(v)
y=P.b
w=P.a
x=(v&&C.w).b8(v,"webgl2",P.a4(["alpha",!1,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1,"failIfMajorPerformanceCaveat",!1],y,w))
u.a=x
if(x==null)H.N(P.e4('Calling canvas.getContext("webgl2") failed,\nmake sure you run on a computer that supports WebGL2.\n\nYou can test your browser\'s compatibility here: http://webglreport.com/\n\n(If you are using Dartium make sure you start it with the\noption: --enable-unsafe-es3-apis)\n'))
t="ChronosGL Config: "+H.e(J.hf(x))
if($.bB>0)P.O("I: "+t)
J.dH(x,0,0,0,1)
J.cD(x,2929)
N.K("FLOAT "+H.e(J.hg(x,"EXT_color_buffer_float")))
x=$.$get$a6()
x.i(0,"uColorMode",new G.y("float","",0))
x.i(0,"uFactor",new G.y("float","for inverse fft",0))
x.i(0,"uBirthHi",new G.y("float","",0))
x.i(0,"uBirthLo",new G.y("float","",0))
x.i(0,"uDeathLo",new G.y("float","",0))
x.i(0,"uDeathHi",new G.y("float","",0))
x.i(0,"uSpeed",new G.y("float","",0))
x.i(0,"uAliveThreshold",new G.y("float","",0))
x=window.innerWidth
t=window.innerHeight
if(typeof x!=="number")return x.K()
if(typeof t!=="number")return H.a8(t)
if(x<t){s=512
r=1024}else{s=1024
r=512}q=$.G.b.h(0,"resolution").a5()
if(q==="hi"){s*=2
r*=2}N.K("Resolution: "+H.e(q)+" "+s+"x"+r)
x="Creating Parameter "+s+" x "+r
if($.bB>0)P.O("I: "+x)
P.O("Res "+s+" x "+r)
v.width=s
v.height=r
x="Rules "+O.eg(0.187,0.208,0.196,0.382).j(0)
if($.bB>0)P.O("I: "+x)
x=O.eg(0.2,0.3,0.3,0.4)
t=U.b0(u,s,r)
p=U.b0(u,s,r)
o=U.b0(u,s,r)
n=U.b0(u,s,r)
m=U.b0(u,s,r)
l=U.b0(u,s,r)
k=U.b0(u,s,r)
j=G.bS("snm",u,$.$get$fI(),$.$get$fH())
i=new O.iY(j,new G.aj(P.V(y,w),"multiply",!1,!0))
i.c=G.bJ("quad",j,B.bR(1))
j=G.bS("snm",u,$.$get$fP(),$.$get$fO())
h=new O.jB(j,new G.aj(P.V(y,w),"snm",!1,!0))
h.c=G.bJ("quad",j,B.bR(1))
j=G.bS("final",u,$.$get$fw(),$.$get$fv())
w=new O.ib(j,new G.aj(P.V(y,w),"final",!1,!0))
w.c=G.bJ("quad",j,B.bR(1))
j=O.e6(u)
y=O.e7(u)
g=$.$get$cf()
f=G.ch(u,"ping-enc",s,r,33328,g)
e=G.ch(u,"pong-enc",s,r,33328,g)
d=O.c6(u,s,!1,"fft-w")
c=O.c6(u,r,!1,"fft-h")
j=new O.i5(d,c,f,e,y,j,s,r)
N.K("FFTEncode ping/pong textures "+s+" "+r)
N.K("steps-w: "+d.length)
N.K("steps-h: "+c.length)
j.y=G.bI(u,f,null,null,!1)
j.z=G.bI(u,e,null,null,!1)
e=O.e6(u)
f=O.e7(u)
c=G.ch(u,"ping-dec",s,r,33328,g)
g=G.ch(u,"pong-dec",s,r,33328,g)
e=new O.i2(O.c6(u,s,!0,"fft-w"),O.c6(u,r,!0,"fft-h"),c,g,f,e,s,r)
N.K("FFTDecode ping/pong textures "+s+" "+r)
e.y=G.bI(u,c,null,null,!1)
e.z=G.bI(u,g,null,null,!1)
x=new U.iF(u,s,r,t,p,o,n,m,l,k,new G.c3(u,null,null,null,null),j,e,i,h,w,x)
N.K("Life "+s+" x "+r+" create framebuffers")
if($.bB>0)P.O("I: create phases")
x.dy=t
x.fr=p
$.ac=x
U.db()
J.dH(u.a,0,0,1,1)
N.K("Starting ChronosGL main loop")
z.a=$.ac.bn()
z.b=1
z.c=0
C.v.cw(window,new U.ms(z))},
j7:{"^":"j:0;",
$0:function(){C.c.C(document,".about").hidden=!0
return}},
iF:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,0dy,0fr,fx",
bn:function(){var z,y,x,w,v
z=this.Q
y=this.b
x=this.c
w=z.a
z=z.b
J.al(w.a,36160,z)
v=new Uint8Array(4*y*x)
J.hm(w.a,0,0,y,x,6408,5121,v)
J.al(w.a,36160,null)
return v}},
mt:{"^":"j:30;",
$1:function(a){var z,y
H.k(a,"$isbP")
N.K("key pressed "+H.e(a.keyCode)+" "+J.cE(W.cn(a.target)).j(0))
z=J.cE(W.cn(a.target)).ga_()
y=C.ac.ga_()
if(z===y)return
U.cP(P.jP(H.l([a.keyCode],[P.w]),0,null),"")}},
mu:{"^":"j:31;",
$1:[function(a){var z,y,x
H.k(a,"$isR")
z=J.o(a)
y=H.I(z.gb5(a),"$isbk")
y.toString
x=J.bZ(y,"data-"+new W.eS(new W.eT(y)).aZ("cmd"))
z=H.I(z.gb5(a),"$isbk")
z.toString
U.cP(x,J.bZ(z,"data-"+new W.eS(new W.eT(z)).aZ("param")))},null,null,4,0,null,21,"call"]},
mv:{"^":"j:32;",
$1:function(a){N.K("click area "+J.cE(W.cn(H.k(a,"$isaA").target)).j(0))
U.cP("C","")}},
ms:{"^":"j:33;a",
$1:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
H.fJ(a)
if(typeof a!=="number")return a.D()
z=this.a
R.k2(a+0,$.$get$fy(),"Change "+H.e(z.b))
$.ac.fx.a=$.G.L("birthLo")
$.ac.fx.b=$.G.L("birthHi")
$.ac.fx.c=$.G.L("deathLo")
$.ac.fx.d=$.G.L("deathHi")
$.ac.fx.f=$.G.L("speed")
y=P.fq($.G.b.h(0,"colorMode").a5(),null)
x=$.ac
w=x.ch
v=x.a
u=x.z
w.O(v,u,x.dy.c)
w=x.f
t=x.b
s=x.c
w.ag(0,0,0,t,s)
r=x.cy
u=u.c
r.O(w,x.x.c,u)
q=x.r
q.ag(0,0,0,t,s)
r.O(q,x.y.c,u)
u=x.cx
r=w.c
u.O(v,w,r)
w=q.c
u.O(v,q,w)
x.fr.ag(0,0,0,t,s)
q=x.db
v=x.dy
u=x.fx
N.b_("Run SNM")
p=q.b
o=p.d
o.i(0,"uTexture",r)
o.i(0,"uTexture2",w)
o.i(0,"uTexture3",v.c)
o.i(0,"uSpeed",u.f)
v=u.a
w=u.r
if(typeof v!=="number")return v.W()
if(typeof w!=="number")return H.a8(w)
o.i(0,"uBirthLo",v*w)
w=u.b
v=u.r
if(typeof w!=="number")return w.W()
if(typeof v!=="number")return H.a8(v)
o.i(0,"uBirthHi",w*v)
v=u.c
w=u.r
if(typeof v!=="number")return v.W()
if(typeof w!=="number")return H.a8(w)
o.i(0,"uDeathLo",v*w)
w=u.d
v=u.r
if(typeof w!=="number")return w.W()
if(typeof v!=="number")return H.a8(v)
o.i(0,"uDeathHi",w*v)
v=u.x
if(typeof v!=="number")return H.a8(v)
o.i(0,"uAliveThreshold",u.e*v)
v=[G.aj]
q.a.a4(q.c,H.l([p],v))
x.Q.ag(0,0,0,t,s)
s=x.dx
t=x.fr
N.b_("Draw")
p=s.b
q=p.d
q.i(0,"uTexture",t.c)
q.i(0,"uColorMode",y)
s.a.a4(s.c,H.l([p],v))
n=x.dy
x.dy=x.fr
x.fr=n
if(++z.c===100){z.c=0
m=$.ac.bn()
l=U.jG(m,z.a)
z.b=l
x="Change ratio: "+H.e(l)
P.O(N.cm("E")+x)
x=z.b
w=$.G.L("stableThreshold")
if(typeof w!=="number")return H.a8(w)
if(x<=w)U.db()
z.a=m}C.v.cw(window,this)},null,null,4,0,null,22,"call"]}},1],["","",,R,{"^":"",
dg:function(a){var z,y,x
z=H.l([],[P.b])
for(y=$.$get$f8(),x=new H.a9(y,[H.h(y,0)]),x=x.gA(x);x.q();)C.a.l(z,y.h(0,x.d).h(0,a))
return z},
jT:function(){var z,y,x,w,v,u
z=document.documentElement
y=z==null
if(y)H.N(P.am("object cannot be a num, string, bool, or null"))
x=H.k(P.fj(P.dl(z)),"$isay")
for(z=R.dg("l"),y=z.length,w=!1,v=0;v<z.length;z.length===y||(0,H.T)(z),++v){u=z[v]
x.toString
if(typeof u!=="string"&&!0)H.N(P.am("property is not a String or num"))
if(u in x.a&&x.h(0,u)!=null)w=!0}if(!w)for(z=R.dg("r"),y=z.length,v=0;v<y;++v){u=z[v]
x.toString
if(typeof u!=="string"&&!0)H.N(P.am("property is not a String or num"))
if(u in x.a){x.c_(u)
break}}else for(z=R.dg("x"),y=z.length,v=0;v<y;++v){u=z[v]
x.toString
if(typeof u!=="string"&&!0)H.N(P.am("property is not a String or num"))
if(u in x.a){x.c_(u)
break}}},
k2:function(a,b,c){var z=$.dy+1
$.dy=z
if(a-$.fz<1000)return
z=$.fx*0.1+0.9*(z*1000/1000)
$.fx=z
b.textContent=C.n.ez(z,2)+"\n"+c
$.dy=0
$.fz=a},
il:function(){var z,y,x,w,v,u
z=document.createElement("canvas")
y=H.k(C.w.b8(z,"webgl2",P.V(P.b,P.a)),"$isd6")
if(y==null)return!1
x=new R.im(y)
x.$2("max texture units:          ",34930)
x.$2("max vertex texture units:   ",35660)
x.$2("max texture size:           ",3379)
x.$2("max cube map texture size:  ",34076)
x.$2("compressed texture formats: ",34467)
w=new R.io(y)
w.$2("vertex shader precision:   ",35633)
w.$2("fragment shader precision: ",35632)
for(v=J.aT(y.getSupportedExtensions());v.q();){u=v.gB(v)
window
u="Extension "+H.e(u)
if(typeof console!="undefined")window.console.info(u)}return!0},
im:{"^":"j:8;a",
$2:function(a,b){var z,y
z=C.k.cU(this.a,b)
window
y=a+H.e(z)
if(typeof console!="undefined")window.console.info(y)}},
io:{"^":"j:8;a",
$2:function(a,b){var z,y,x,w,v,u,t,s
z=this.a
y=C.k.V(z,b,36338)
x=C.k.V(z,b,36337)
w=C.k.V(z,b,36336)
window
v=a+("[fp] "+H.e(y.precision)+"  "+H.e(x.precision)+" "+H.e(w.precision))
if(typeof console!="undefined")window.console.info(v)
u=C.k.V(z,b,36341)
t=C.k.V(z,b,36340)
s=C.k.V(z,b,36339)
window
z=a+("[int] "+H.e(u.rangeMax)+"  "+H.e(t.rangeMax)+" "+H.e(s.rangeMax))
if(typeof console!="undefined")window.console.info(z)}}}]]
setupProgram(dart,0,0)
J.C=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ec.prototype
return J.eb.prototype}if(typeof a=="string")return J.bN.prototype
if(a==null)return J.ed.prototype
if(typeof a=="boolean")return J.iz.prototype
if(a.constructor==Array)return J.aZ.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bO.prototype
return a}if(a instanceof P.a)return a
return J.cu(a)}
J.bb=function(a){if(typeof a=="string")return J.bN.prototype
if(a==null)return a
if(a.constructor==Array)return J.aZ.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bO.prototype
return a}if(a instanceof P.a)return a
return J.cu(a)}
J.cs=function(a){if(a==null)return a
if(a.constructor==Array)return J.aZ.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bO.prototype
return a}if(a instanceof P.a)return a
return J.cu(a)}
J.fB=function(a){if(typeof a=="number")return J.bM.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bu.prototype
return a}
J.mb=function(a){if(typeof a=="number")return J.bM.prototype
if(typeof a=="string")return J.bN.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bu.prototype
return a}
J.bC=function(a){if(typeof a=="string")return J.bN.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bu.prototype
return a}
J.o=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bO.prototype
return a}if(a instanceof P.a)return a
return J.cu(a)}
J.ct=function(a){if(a==null)return a
if(!(a instanceof P.a))return J.bu.prototype
return a}
J.bE=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.C(a).E(a,b)}
J.ad=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.fB(a).J(a,b)}
J.fR=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.fB(a).K(a,b)}
J.bF=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.mn(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bb(a).h(a,b)}
J.cz=function(a,b){return J.bC(a).al(a,b)}
J.fS=function(a,b,c,d){return J.o(a).dQ(a,b,c,d)}
J.dE=function(a,b){return J.o(a).bR(a,b)}
J.fT=function(a,b,c,d){return J.o(a).e2(a,b,c,d)}
J.dF=function(a,b,c){return J.o(a).bT(a,b,c)}
J.fU=function(a,b){return J.o(a).e4(a,b)}
J.cA=function(a,b,c){return J.o(a).bU(a,b,c)}
J.al=function(a,b,c){return J.o(a).bV(a,b,c)}
J.au=function(a,b,c){return J.o(a).bW(a,b,c)}
J.bY=function(a,b){return J.o(a).e7(a,b)}
J.fV=function(a,b){return J.o(a).bX(a,b)}
J.fW=function(a,b,c){return J.o(a).bY(a,b,c)}
J.dG=function(a,b,c,d){return J.o(a).bZ(a,b,c,d)}
J.fX=function(a,b){return J.o(a).c0(a,b)}
J.fY=function(a,b){return J.o(a).c2(a,b)}
J.dH=function(a,b,c,d,e){return J.o(a).c3(a,b,c,d,e)}
J.fZ=function(a,b){return J.mb(a).T(a,b)}
J.cB=function(a,b,c){return J.bb(a).ee(a,b,c)}
J.cC=function(a){return J.o(a).c7(a)}
J.h_=function(a){return J.o(a).c8(a)}
J.h0=function(a){return J.o(a).c9(a)}
J.dI=function(a){return J.o(a).cb(a)}
J.h1=function(a){return J.o(a).ef(a)}
J.h2=function(a,b){return J.o(a).cc(a,b)}
J.h3=function(a,b){return J.o(a).cd(a,b)}
J.h4=function(a,b,c,d){return J.o(a).ce(a,b,c,d)}
J.h5=function(a,b,c,d,e){return J.o(a).eh(a,b,c,d,e)}
J.h6=function(a,b,c,d,e){return J.o(a).cf(a,b,c,d,e)}
J.h7=function(a,b,c,d,e,f){return J.o(a).ei(a,b,c,d,e,f)}
J.h8=function(a,b){return J.cs(a).t(a,b)}
J.cD=function(a,b){return J.o(a).cg(a,b)}
J.h9=function(a,b){return J.o(a).ci(a,b)}
J.ha=function(a){return J.o(a).ej(a)}
J.hb=function(a,b){return J.cs(a).u(a,b)}
J.hc=function(a,b,c,d,e,f){return J.o(a).ck(a,b,c,d,e,f)}
J.aS=function(a){return J.C(a).gv(a)}
J.aT=function(a){return J.cs(a).gA(a)}
J.aU=function(a){return J.bb(a).gk(a)}
J.hd=function(a){return J.o(a).gcr(a)}
J.cE=function(a){return J.C(a).gb4(a)}
J.he=function(a){return J.ct(a).geS(a)}
J.cF=function(a){return J.ct(a).gcR(a)}
J.cG=function(a){return J.ct(a).gcS(a)}
J.dJ=function(a){return J.ct(a).geE(a)}
J.bZ=function(a,b){return J.o(a).b7(a,b)}
J.hf=function(a){return J.o(a).az(a)}
J.dK=function(a){return J.o(a).b9(a)}
J.hg=function(a,b){return J.o(a).ba(a,b)}
J.hh=function(a,b){return J.o(a).bb(a,b)}
J.hi=function(a,b,c){return J.o(a).bc(a,b,c)}
J.dL=function(a,b,c){return J.o(a).bg(a,b,c)}
J.hj=function(a,b){return J.o(a).cl(a,b)}
J.hk=function(a,b,c){return J.cs(a).cm(a,b,c)}
J.hl=function(a,b){return J.C(a).b1(a,b)}
J.hm=function(a,b,c,d,e,f,g,h){return J.o(a).cu(a,b,c,d,e,f,g,h)}
J.hn=function(a,b){return J.bC(a).cW(a,b)}
J.ho=function(a,b,c,d){return J.o(a).bl(a,b,c,d)}
J.dM=function(a,b){return J.bC(a).af(a,b)}
J.dN=function(a,b,c,d,e,f,g,h,i,j){return J.o(a).cB(a,b,c,d,e,f,g,h,i,j)}
J.hp=function(a,b,c,d){return J.o(a).cC(a,b,c,d)}
J.c_=function(a,b,c,d){return J.o(a).cD(a,b,c,d)}
J.hq=function(a,b,c,d,e,f){return J.o(a).ey(a,b,c,d,e,f)}
J.bh=function(a){return J.C(a).j(a)}
J.hr=function(a,b,c,d){return J.o(a).eA(a,b,c,d)}
J.hs=function(a){return J.bC(a).eB(a)}
J.ht=function(a,b,c){return J.o(a).cG(a,b,c)}
J.cH=function(a,b,c){return J.o(a).cH(a,b,c)}
J.dO=function(a,b,c){return J.o(a).cI(a,b,c)}
J.dP=function(a,b,c){return J.o(a).cJ(a,b,c)}
J.dQ=function(a,b,c){return J.o(a).cK(a,b,c)}
J.hu=function(a,b,c,d){return J.o(a).cL(a,b,c,d)}
J.hv=function(a,b,c,d){return J.o(a).cM(a,b,c,d)}
J.hw=function(a,b){return J.o(a).cN(a,b)}
J.hx=function(a,b,c){return J.o(a).eD(a,b,c)}
J.hy=function(a,b,c,d,e,f,g){return J.o(a).cO(a,b,c,d,e,f,g)}
J.bG=function(a,b,c,d,e){return J.o(a).cQ(a,b,c,d,e)}
I.cw=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.I=W.hD.prototype
C.w=W.cL.prototype
C.c=W.ip.prototype
C.M=W.bm.prototype
C.N=J.i.prototype
C.a=J.aZ.prototype
C.j=J.eb.prototype
C.b=J.ec.prototype
C.l=J.ed.prototype
C.n=J.bM.prototype
C.e=J.bN.prototype
C.U=J.bO.prototype
C.B=H.iZ.prototype
C.r=H.j0.prototype
C.C=J.jg.prototype
C.k=P.d6.prototype
C.D=W.bs.prototype
C.m=W.jL.prototype
C.u=J.bu.prototype
C.v=W.dc.prototype
C.J=new P.kn()
C.d=new P.l9()
C.K=new P.ao(0)
C.L=new P.ao(4e6)
C.O=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.P=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.x=function(hooks) { return hooks; }

C.Q=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.R=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.S=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.T=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.y=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.z=I.cw([])
C.V=H.l(I.cw([]),[P.b2])
C.A=new H.hO(0,{},C.V,[P.b2,null])
C.W=new G.y("vec3","vertex btangents",0)
C.f=new G.y("vec3","",0)
C.X=new G.y("vec4","delta from light",0)
C.t=new G.y("","",0)
C.E=new G.y("vec3","vertex coordinates",0)
C.Y=new G.y("vec3","vertex binormals",0)
C.F=new G.y("vec4","for wireframe",0)
C.Z=new G.y("vec4","per vertex color",0)
C.a_=new G.y("float","for normal maps",0)
C.o=new G.y("mat4","",0)
C.a1=new G.y("mat4","",4)
C.a0=new G.y("mat4","",128)
C.h=new G.y("float","",0)
C.a2=new G.y("float","",4)
C.a3=new G.y("float","depth for shadowmaps",0)
C.i=new G.y("sampler2D","",0)
C.a4=new G.y("float","for bump maps",0)
C.a5=new G.y("vec2","texture uvs",0)
C.a6=new G.y("float","time since program start in sec",0)
C.p=new G.y("vec2","",0)
C.a7=new G.y("samplerCube","",0)
C.q=new G.y("vec4","",0)
C.a8=new G.y("vec3","vertex normals",0)
C.a9=new G.y("sampler2DShadow","",0)
C.G=new G.y("vec3","per vertex color",0)
C.H=new G.y("mat3","",0)
C.aa=new G.y("vec3","vertex tangents",0)
C.ab=new H.d7("call")
C.ac=H.fp(W.ap)
C.ad=H.fp(P.z)
$.ae=0
$.bi=null
$.dT=null
$.dq=!1
$.fC=null
$.fl=null
$.fM=null
$.cr=null
$.cv=null
$.dB=null
$.b6=null
$.bw=null
$.bx=null
$.dr=!1
$.B=C.d
$.e0=null
$.e_=null
$.dZ=null
$.dY=null
$.bB=0
$.bA=0
$.G=null
$.ac=null
$.dy=0
$.fz=0
$.fx=1
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["c1","$get$c1",function(){return H.dz("_$dart_dartClosure")},"cS","$get$cS",function(){return H.dz("_$dart_js")},"ew","$get$ew",function(){return H.ai(H.cg({
toString:function(){return"$receiver$"}}))},"ex","$get$ex",function(){return H.ai(H.cg({$method$:null,
toString:function(){return"$receiver$"}}))},"ey","$get$ey",function(){return H.ai(H.cg(null))},"ez","$get$ez",function(){return H.ai(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"eD","$get$eD",function(){return H.ai(H.cg(void 0))},"eE","$get$eE",function(){return H.ai(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"eB","$get$eB",function(){return H.ai(H.eC(null))},"eA","$get$eA",function(){return H.ai(function(){try{null.$method$}catch(z){return z.message}}())},"eG","$get$eG",function(){return H.ai(H.eC(void 0))},"eF","$get$eF",function(){return H.ai(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dd","$get$dd",function(){return P.k6()},"cO","$get$cO",function(){var z=new P.a0(0,C.d,[P.z])
z.dV(null)
return z},"bz","$get$bz",function(){return[]},"dX","$get$dX",function(){return{}},"df","$get$df",function(){return H.dz("_$dart_dartObject")},"dm","$get$dm",function(){return function DartObject(a){this.o=a}},"a6","$get$a6",function(){return P.a4(["cBlendEquation",C.t,"cDepthWrite",C.t,"cDepthTest",C.t,"cStencilFunc",C.t,"tPosition",C.f,"tSpeed",C.f,"tForce",C.f,"aColor",C.G,"aColorAlpha",C.Z,"aPosition",C.E,"aTexUV",C.a5,"aNormal",C.a8,"aBinormal",C.Y,"aCenter",C.F,"aPointSize",C.h,"aBoneIndex",C.q,"aBoneWeight",C.q,"aTangent",C.aa,"aBitangent",C.W,"iaRotation",C.q,"iaTranslation",C.f,"iaScale",C.f,"vColor",C.G,"vTexUV",C.p,"vLightWeighting",C.f,"vNormal",C.f,"vPosition",C.E,"vPositionFromLight",C.X,"vCenter",C.F,"vDepth",C.a3,"uTransformationMatrix",C.o,"uModelMatrix",C.o,"uNormalMatrix",C.H,"uConvolutionMatrix",C.H,"uPerspectiveViewMatrix",C.o,"uLightPerspectiveViewMatrix",C.o,"uShadowMap",C.a9,"uTexture",C.i,"uTexture2",C.i,"uTexture3",C.i,"uTexture4",C.i,"uSpecularMap",C.i,"uNormalMap",C.i,"uBumpMap",C.i,"uDepthMap",C.i,"uCubeTexture",C.a7,"uAnimationTable",C.i,"uTime",C.a6,"uCameraNear",C.h,"uCameraFar",C.h,"uFogNear",C.h,"uFogFar",C.h,"uPointSize",C.h,"uScale",C.h,"uAngle",C.h,"uCanvasSize",C.p,"uCenter2",C.p,"uCutOff",C.h,"uShininess",C.h,"uShadowBias",C.h,"uOpacity",C.h,"uColor",C.f,"uAmbientDiffuse",C.f,"uColorEmissive",C.f,"uColorSpecular",C.f,"uColorDiffuse",C.f,"uColorAlpha",C.q,"uColorAlpha2",C.q,"uEyePosition",C.f,"uMaterial",C.o,"uRange",C.p,"uDirection",C.p,"uBoneMatrices",C.a0,"uLightDescs",C.a1,"uLightCount",C.h,"uLightTypes",C.a2,"uBumpScale",C.a4,"uNormalScale",C.a_],P.b,G.y)},"cf","$get$cf",function(){var z=new G.jR(!1,!1,!1,!0,1,9729,9729)
z.d=!1
z.b=!0
z.f=9728
z.r=9728
return z},"ft","$get$ft",function(){var z,y
z=G.ag("fftV")
y=[P.b]
z.a2(H.l(["aPosition"],y))
z.a7(H.l(["gl_Position = vec4(aPosition, 1.0);"],y))
return z},"fr","$get$fr",function(){var z,y
z=G.ag("fftF")
y=[P.b]
z.a3(H.l(["uTexture","uTexture2","uFactor"],y))
z.a6(H.l(["vec2 ComplexMul (vec2 a, vec2 b) {\n    return vec2 (a.x * b.x - a.y * b.y, \n                 a.x * b.y + a.y * b.x);\n}\n\nvoid main() {\n    ivec2 iv = ivec2(gl_FragCoord.xy - 0.5);\n    vec4 ip = texelFetch (uTexture2, ivec2 (iv.y, 0), 0).rgba;\n\n    int indexA = int(ip.r);\n    int indexB = int(ip.g);\n    vec2  multiplier = ip.ba;\n    vec2 a = texelFetch (uTexture, ivec2 (iv.x, indexA), 0).rg;\n    vec2 b = texelFetch (uTexture, ivec2 (iv.x, indexB), 0).rg;\n    oFragColor.rg = (a + ComplexMul(multiplier, b)) * uFactor;\n}\n"],y))
return z},"fu","$get$fu",function(){var z,y
z=G.ag("fftV")
y=[P.b]
z.a2(H.l(["aPosition"],y))
z.a7(H.l(["gl_Position = vec4(aPosition, 1.0);"],y))
return z},"fs","$get$fs",function(){var z,y
z=G.ag("fftF")
y=[P.b]
z.a3(H.l(["uTexture","uTexture2","uFactor"],y))
z.a6(H.l(["vec2 ComplexMul (vec2 a, vec2 b) {\n    return vec2 (a.x * b.x - a.y * b.y, \n                 a.x * b.y + a.y * b.x);\n}\n\nvoid main() {\n    ivec2 iv = ivec2(gl_FragCoord.xy - 0.5);\n    vec4 ip = texelFetch (uTexture2, ivec2 (iv.x, 0), 0).rgba;\n    int indexA = int(ip.r);\n    int indexB = int(ip.g);\n    vec2  multiplier = ip.ba;\n    vec2 a = texelFetch (uTexture, ivec2 (indexA, iv.y), 0).rg;\n    vec2 b = texelFetch (uTexture, ivec2 (indexB, iv.y), 0).rg;\n    oFragColor.rg = (a + ComplexMul(multiplier, b)) * uFactor;\n}\n"],y))
return z},"fw","$get$fw",function(){var z,y
z=G.ag("finalV")
y=[P.b]
z.a2(H.l(["aPosition","aTexUV"],y))
z.ai(H.l(["vTexUV"],y))
z.a7(H.l(["gl_Position = vec4(aPosition, 1.0);","vTexUV = aTexUV;"],y))
return z},"fv","$get$fv",function(){var z,y
z=G.ag("finalF")
y=[P.b]
z.ai(H.l(["vTexUV"],y))
z.a3(H.l(["uTexture","uColorMode"],y))
z.a6(H.l([" vec3 rainbow (float f) { \n    if (f>=0.0 && f<1.0) return vec3(1.0, f-0.0, 0.0);   \n    else if (f>=1.0 && f<2.0) return vec3(2.0-f, 1.0, 0.0);   \n    else if (f>=2.0 && f<3.0) return vec3(0.0, 1.0, f-2.0); \n    else if (f>=3.0 && f<4.0) return vec3(0.0, 4.0-f, 1.0);   \n    else if (f>=4.0 && f<5.0) return vec3(f-4.0, 0.0, 1.0);   \n    else if (f>=5.0 && f<6.0) return vec3(1.0, 0.0, 6.0-f); \n    else  return vec3(0.0, 0.0, 0.0); \n }\n\nvec3 Color(float mode, float curr, float last) {\n    if (mode == 1.0) {\n      float color;\n      if (curr > 0.5) color = 1.0; else color = 0.0;\n      return vec3(color, color, color);\n    } else if (mode == 2.0) {\n      return rainbow (6.0*sqrt(sqrt(1.0-curr)))*sqrt(sqrt(curr)); \n    } else {\n      return vec3(curr, curr, curr);\n    }\n}\n\nvoid main() {\n    vec2 v = vTexUV.xy;\n    float curr = texture (uTexture, v).r;\n    float last = texture (uTexture, v).b;\n    oFragColor = vec4(Color(uColorMode, curr, last), 1.0);\n}\n"],y))
return z},"fI","$get$fI",function(){var z,y
z=G.ag("mulV")
y=[P.b]
z.a2(H.l(["aPosition"],y))
z.a7(H.l(["gl_Position = vec4(aPosition, 1.0);"],y))
return z},"fH","$get$fH",function(){var z,y
z=G.ag("mulF")
y=[P.b]
z.a3(H.l(["uTexture","uTexture2"],y))
z.a6(H.l(["vec2 ComplexMul (vec2 a, vec2 b) {\n    return vec2 (a.x * b.x - a.y * b.y, \n                 a.x * b.y + a.y * b.x);\n}\n\nvoid main() {\n    ivec2 v = ivec2(gl_FragCoord.xy - 0.5);\n    vec2 a = texelFetch (uTexture2, v, 0).rg;\n    vec2 b = texelFetch (uTexture, v, 0).rg;\n    oFragColor.rg = ComplexMul(a, b);\n}\n"],y))
return z},"fP","$get$fP",function(){var z,y
z=G.ag("SNMV")
y=[P.b]
z.a2(H.l(["aPosition","aTexUV"],y))
z.ai(H.l(["vTexUV"],y))
z.a7(H.l(["gl_Position = vec4(aPosition, 1.0);","vTexUV = aTexUV;"],y))
return z},"fO","$get$fO",function(){var z,y
z=G.ag("SNMF")
y=[P.b]
z.ai(H.l(["vTexUV"],y))
z.a3(H.l(["uTexture","uTexture2","uTexture3","uSpeed","uAliveThreshold","uBirthLo","uBirthHi","uDeathLo","uDeathHi"],y))
z.a6(H.l(["float isGE(float x , float t, float ea) {\n  if (x >= t) return 1.0;\n  else return 0.0;\n  \n  // return 1.0/(1.0+exp(-(x-t)*4.0/ea));\n}\n\nfloat isWithin (float x, float a, float b, float ea) {\n  // if (x>=a && x<=b) return 1.0; \n  // else return 0.0;\n  return isGE(x, a, ea) * (1.0 - isGE(x, b, ea));\n}\n\n\n\nfloat sm = 0.147;\nfloat sn = 0.028;\n\nfloat NextStateHard(float m, float n) {\n  float isAlive = isGE(m, uAliveThreshold, sm);\n  float birth = isWithin(n, uBirthLo, uBirthHi, sn);\n  float survive = isWithin(n, uDeathLo, uDeathHi, sn);\n  return isAlive * survive + (1.0 - isAlive) * birth;\n}\n\n\nvoid main() {\n  float dt = uSpeed;\n  ivec2 v = ivec2(gl_FragCoord.xy - 0.5);\n  // disk \n  float m = texelFetch (uTexture, v, 0).r;\n  // ring\n  float n = texelFetch (uTexture2, v, 0).r;\n  // current\n  float last = texelFetch (uTexture3, v, 0).r;\n  float next;\n  // next = NextStateHard(m, n);\n  next = (1.0 - dt) * last  + dt * NextStateHard(m, n);\n  //next =  last  + dt * (2.0 * NextStateHard(m, n) - 1.0);\n  oFragColor.r = clamp(next, 0.0, 1.0);\n  oFragColor.g = 0.0;\n  oFragColor.b = last;\n}\n"],y))
return z},"fc","$get$fc",function(){var z=P.b
return P.a4(["B","checkbox","I","number","D","number","O","text","S","text"],z,z)},"fA","$get$fA",function(){var z=P.l7(0)
return z},"fy","$get$fy",function(){return W.mz("#fps")},"f8","$get$f8",function(){var z=P.b
return P.a4(["std",P.a4(["r","requestFullscreen","x","exitFullscreen","e","fullscreenEnabled","l","fullscreenElement"],z,z),"ms",P.a4(["r","msRequestFullscreen","x","msExitFullscreen","e","msFullscreenEnabled","l","msFullscreenElement"],z,z),"webkit",P.a4(["r","webkitRequestFullscreen","x","webkitExitFullscreen","e","webkitFullscreenEnabled","l","webkitFullscreenElement"],z,z),"moz",P.a4(["r","mozRequestFullScreen","x","mozCancelFullScreen","e","mozFullScreenEnabled","l","mozFullScreenElement"],z,z)],z,[P.D,P.b,P.b])}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=["invocation","error","_",null,"stackTrace","o","index","closure","numberOfArguments","arg1","arg2","arg3","arg4","parameter","each","arg","e","callback","captureThis","self","arguments","ev","t"]
init.types=[{func:1,ret:-1},{func:1,ret:P.z},{func:1,args:[,]},{func:1,ret:P.z,args:[P.b,P.b]},{func:1,ret:-1,args:[P.b,,]},{func:1,ret:P.z,args:[,]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:-1,args:[P.a],opt:[P.a_]},{func:1,ret:-1,args:[P.b,P.w]},{func:1,ret:P.z,args:[P.b,S.bq]},{func:1,ret:G.c3,args:[P.w]},{func:1,ret:G.b3,args:[P.w]},{func:1,ret:P.F,args:[P.F,P.F]},{func:1,ret:P.z,args:[,,]},{func:1,ret:P.b,args:[P.w]},{func:1,ret:P.b,args:[W.bm]},{func:1,ret:P.z,args:[W.bQ]},{func:1,ret:P.z,args:[P.b,,]},{func:1,ret:-1,args:[P.b,P.b]},{func:1,ret:P.z,args:[P.b2,,]},{func:1,args:[W.R]},{func:1,ret:P.cV,args:[,]},{func:1,ret:[P.cU,,],args:[,]},{func:1,ret:P.ay,args:[,]},{func:1,ret:P.w,args:[P.w,P.a]},{func:1,ret:[P.a0,,],args:[,]},{func:1,ret:P.z,args:[,],opt:[,]},{func:1,ret:-1,args:[P.a]},{func:1,ret:-1,args:[P.b]},{func:1,args:[P.b]},{func:1,ret:P.z,args:[W.bP]},{func:1,ret:P.z,args:[W.R]},{func:1,ret:P.z,args:[W.aA]},{func:1,ret:-1,args:[P.M]},{func:1,args:[,P.b]},{func:1,ret:P.w,args:[,,]},{func:1,ret:P.z,args:[{func:1,ret:-1}]},{func:1,ret:P.a,args:[,]},{func:1,ret:-1,args:[P.w,P.w,P.F]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.mB(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.cw=a.cw
Isolate.b9=a.b9
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(U.fG,[])
else U.fG([])})})()
//# sourceMappingURL=smoothlife.dart.js.map
