# Serial port settings
$portName = "COM4" # Replace with your serial port name
$baudRate = 9600
$dataBits = 8
$parity = "None"
$stopBits = "One"
$endpointUrl = "https://localhost:3000/arrivals" # Replace with your REST endpoint URL

# Open serial port
$serialPort = New-Object System.IO.Ports.SerialPort -ArgumentList @($portName, $baudRate, $parity, $dataBits, $stopBits)
$serialPort.Open()



function SendColorToEndpoint($color) {
    $body = @{
        color = $color
    } | ConvertTo-Json

    try {
        $response = Invoke-WebRequest -Uri "https://comfortable-toad-swimsuit.cyclic.app/arrivals" -Method POST -ContentType "application/json" -Body $body
        Write-Host "Sent color: $color - Response: $($response.StatusCode) $($response.StatusDescription)"
    }catch {
        Write-Host "Error sending color: $color - $($_.Exception.Message)"
    }
}

do {
    $color = $serialPort.ReadLine().Trim()
    SendColorToEndpoint($color)
}
while ($serialPort.IsOpen)