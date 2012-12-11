
$pathinfo=pathinfo($_ENV['SCRIPT_FILENAME']); 
$extension=$pathinfo['extension']; 
$offset = 60 * 60 * 24 * 30; 
if($extension=='css'){ 
header('Content-type: text/css; charset=utf-8'); 
header("Expires: ".gmdate("D, d M Y H:i:s", time() + $offset)." GMT"); 
} 
if($extension=='js'){ 
header('Content-type: text/javascript; charset=utf-8'); 
header("Expires: ".gmdate("D, d M Y H:i:s", time() + $offset)." GMT"); 
