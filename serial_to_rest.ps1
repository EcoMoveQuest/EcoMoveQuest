# Serial port settings
$portName = "COM4" # Replace with your serial port name
$baudRate = 9600
$dataBits = 8
$parity = "None"
$stopBits = "One"
$endpointUrl = "https://localhost:3000/arrivals" # Replace with your REST endpoint URL

# Open serial port
$serialPort = New-Object System.IO.Ports.SerialPort -ArgumentList @($portName, $baudRate, $parity, $dataBits, $stopBits)
$serialPort.ReadTimeout = 1000
$serialPort.Open()

# Function to send color to the endpoint
function SendColorToEndpoint($color) {
    $body = @{
        color = $color
    } | ConvertTo-Json

    try {
        $response = Invoke-WebRequest -Uri $endpointUrl -Method POST -ContentType "application/json" -Body $body
        Write-Host "Sent color: $color - Response: $($response.StatusCode) $($response.StatusDescription)"
    } catch {
        Write-Host "Error sending color: $color - $($_.Exception.Message)"
    }
}

try {
    while ($true) {
        try {
            $color = $serialPort.ReadLine().Trim()
            SendColorToEndpoint($color)
        } catch [System.TimeoutException] {
            Write-Host "Read timeout, continuing..."
        } catch {
            Write-Host "Error reading data from the serial port: $($_.Exception.Message)"
            break
        }
    }
} finally {
    if ($serialPort.IsOpen) {
        $serialPort.Close()
        Write-Host "Serial port closed."
    }
}
