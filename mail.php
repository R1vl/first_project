<?php 
 $name = $_POST['user_name'];
 $email = $_POST['user_email'];
 $feedback = $_POST['feedback'];

 $name = htmlspecialchars($name);
 $email = htmlspecialchars($email);
 $feedback = htmlspecialchars($feedback);

 $name = urldecode($name);
 $email = urldecode($email);
 $feedback = urldecode($feedback);

 $name = trim($name);
 $email = trim($email);
 $feedback = trim($feedback);

 //SENDING BY EMAIL
 if (mail("privalova.rivl@gmail.com", "Заявка с сайта", "ФИО:".$name.". E-mail: ".$email ,"From: rivlt@mail.ru \r\n"))
 {     echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}?>
?>