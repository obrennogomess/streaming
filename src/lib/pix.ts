/**
 * Real PIX Static Payload Generator (EMV QRCPS)
 * Following Banco Central do Brasil (BCB) standards.
 */

export function generateStaticPix(key: string, name: string, city: string, amount: number): string {
  const pad = (id: string, value: string) => {
    return id + value.length.toString().padStart(2, '0') + value;
  };

  // GUI (Golden Unit ID for PIX)
  const gui = "br.gov.bcb.pix";
  
  // Merchant Account Info
  const merchantAccountInfo = pad("00", gui) + pad("01", key);

  // Payload segments
  const payload = [
    pad("00", "01"), // Payload Format Indicator
    pad("26", merchantAccountInfo), // Merchant Account Information
    pad("52", "0000"), // Merchant Category Code
    pad("53", "986"), // Transaction Currency (BRL)
    pad("54", amount.toFixed(2)), // Transaction Amount
    pad("58", "BR"), // Country Code
    pad("59", name.substring(0, 25).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()), // Merchant Name
    pad("60", city.substring(0, 15).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()), // Merchant City
    pad("62", pad("05", "***")), // Additional Data Field (Reference)
    "6304" // CRC16 Identifier (Value will be appended after calculation)
  ].join('');

  return payload + calculateCRC16(payload);
}

function calculateCRC16(data: string): string {
  let crc = 0xFFFF;
  const polynomial = 0x1021;

  for (let i = 0; i < data.length; i++) {
    crc ^= (data.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}
