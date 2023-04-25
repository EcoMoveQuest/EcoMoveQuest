$serialPortName = "COM3"  # Replace with your serial port
$baudRate = 9600
$restEndpoint = "http://localhost:3000/arrivals"

function Read-FromSerialPort {
    param($portName, $baudRate)

    $serialPort = New-Object System.IO.Ports.SerialPort($portName, $baudRate)
    $serialPort.Open()

    while ($true) {
        $data = $serialPort.ReadLine()
        if ($data) {
            $data
        }
    }
    $serialPort.Close()
}

function Send-ToRestEndpoint {
    param($color, $time, $endpoint)

    try {
        $jsonPayload = ConvertTo-Json -Compress -InputObject @{ color = $color; time = $time }
        $response = Invoke-WebRequest -Uri $endpoint -Method POST -Body $jsonPayload -ContentType "application/json"
        if ($response.StatusCode -eq 200) {
            $responseData = $response.Content | ConvertFrom-Json
            Write-Host "Color sent successfully: $color"
        } else {
            Write-Host "Failed to send color: $color. Response status: $($response.StatusCode)"
        }
    } catch {
        Write-Host "Error sending color: $color. Error: $($_.Exception.Message)"
    }
}

foreach ($data in Read-FromSerialPort -portName $serialPortName -baudRate $baudRate) {
    $color = $data.Trim()
    $currentTime = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffK"
    Send-ToRestEndpoint -color $color -time $currentTime -endpoint $restEndpoint
    Start-Sleep -Seconds 1  # Adjust the sleep time as needed
}
