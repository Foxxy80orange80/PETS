<?php

    //описание таблицы picture_rating:
    //      dates INT NOT NULL , rating INT NOT NULL 

    // получение оценки и даты с клиента
    $rating=$_POST['rating'];
    $date=$_POST['date'];
    //форматирование даты, чтобы сделать ее int
    $formated_date=(int)str_replace('-','',$date);
    // подключение бд
    $link=mysqli_connect("localhost","root", "root", "rating_db");
    
    // добавление оценки и форматированной даты в таблицу
    $sql = mysqli_query($link, 'INSERT INTO  picture_rating (dates,rating) VALUES ('.$formated_date." ,".$rating.')');
    
    //получение всех оценок от текущей даты
    $all_rating_obj=mysqli_query($link,'SELECT rating FROM picture_rating WHERE dates='.$formated_date);
    //количество оценок
    $rating_count_obj=mysqli_query($link,'SELECT COUNT(*) as count FROM picture_rating WHERE dates='.$formated_date);

    $rating_count = mysqli_fetch_array($rating_count_obj);
        
    $rating_sum=0;


    while($rowData = mysqli_fetch_array($all_rating_obj)){
            $rating_sum+=$rowData["rating"];
    }

    $result=$rating_sum/$rating_count[0];
    echo "(".round($result,1).")";

    mysqli_close($link);
?>
