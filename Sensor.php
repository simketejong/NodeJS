<?php

$content1 = file_get_contents("php://input");
$myfile = fopen("../test.json", "w") or die("Unable to open file!");
$myAccX = fopen("../AccX.json", "w") or die("Unable to open file!");
$myAccY = fopen("../AccY.json", "w") or die("Unable to open file!");
$myAccZ = fopen("../AccZ.json", "w") or die("Unable to open file!");
if(! is_array($decoded)) {
  fwrite($myfile, $content1);
  $obj=json_decode($content1);
  $obj1=$obj->{'TheJSON'};
  $AT=intval($obj1->{'AccelTime'});
  $AX=$obj1->{'AccelX'};
  $AY=$obj1->{'AccelY'};
  $AZ=$obj1->{'AccelZ'};
  fwrite($myAccX, $AX);
  fwrite($myAccY, $AY);
  fwrite($myAccZ, $AZ);
 fclose($myAccX);
 fclose($myAccY);
 fclose($myAccZ);
 fclose($myfile);
}
$txt='http://localhost:23180/?ID=AccelX&value='.$AX;
$txt1='http://localhost:23180/?ID=AccelY&value='.$AY;
$txt2='http://localhost:23180/?ID=AccelZ&value='.$AZ;
$response = file_get_contents($txt);
$response = file_get_contents($txt1);
$response = file_get_contents($txt2);
//if(strlen(trim($error)) > 0){
//echo '{';
//echo '"error": .$error';
//echo '}';
//}
//echo '{';
//echo '"Freq": 10';
//echo '}';
$conn->close();
?>
