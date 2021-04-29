<?php
    function get_data()
    {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "routine";
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        $query = "SELECT * FROM routine_data";
        $result = mysqli_query($conn, $query);
        $data = array();
        while($row = mysqli_fetch_array($result))
        {
            $data[] = array(
                'time'      => $row["time"],
                'date'      => $row["date"],
                'subject'   => $row["subject"]
            );
        }
        return json_encode($data);
    }
    $file_name = 'routine.json';
    if(file_put_contents($file_name, get_data()))
    {
        //echo $file_name . ' file created';
    }
    else
    {
        //echo 'There is some error';
    }
?>