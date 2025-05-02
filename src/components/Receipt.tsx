
import React, { useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { ContractData, formatCurrency } from "@/utils/contractGenerator";
import { numberToWords } from "@/utils/numberToWords";

interface ReceiptProps {
  contractData: ContractData;
}

const Receipt: React.FC<ReceiptProps> = ({ contractData }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const receiptNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        // Usar URL absoluta para a imagem da assinatura
        const imageUrl = `${window.location.origin}/lovable-uploads/340c9b38-0cac-4c58-a897-54ee0dd2412b.png`;
        
        printWindow.document.write(`
          <html>
            <head>
              <title>Recibo - Julio's Pizza House</title>
              <style>
                @page {
                  size: A4;
                  margin: 15mm;
                }
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.5;
                  color: #333;
                  padding: 0;
                  max-width: 100%;
                  margin: 0 auto;
                }
                .receipt-container {
                  border: 2px solid #333;
                  border-radius: 20px;
                  padding: 20px;
                  position: relative;
                }
                .receipt-header {
                  display: flex;
                  align-items: center;
                  margin-bottom: 20px;
                }
                .receipt-title {
                  font-size: 24px;
                  font-weight: bold;
                  margin-right: 10px;
                }
                .receipt-number, .receipt-value {
                  background-color: #aaa;
                  padding: 6px 12px;
                  color: #000;
                  font-weight: bold;
                  margin-left: 10px;
                }
                .receipt-row {
                  display: flex;
                  margin-bottom: 15px;
                }
                .receipt-label {
                  width: 120px;
                  font-weight: normal;
                }
                .receipt-content {
                  flex: 1;
                  border-bottom: 1px solid #333;
                  font-weight: bold;
                  text-transform: uppercase;
                }
                .receipt-footer {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  margin-top: 30px;
                }
                .receipt-date {
                  align-self: flex-end;
                  margin-bottom: 15px;
                }
                .receipt-signature {
                  margin-top: 10px;
                  text-align: center;
                }
                .receipt-signature img {
                  width: 150px;
                  margin: 5px 0;
                }
                @media print {
                  body { padding: 0; }
                  button { display: none; }
                  @page { margin: 15mm; }
                  a[href]:after { content: none !important; }
                }
              </style>
            </head>
            <body>
              <div class="receipt-container">
                ${receiptRef.current.innerHTML}
                <div class="receipt-footer">
                  <div class="receipt-date">LONDRINA, ${currentDate}</div>
                  <div style="font-weight: bold; font-size: 12pt; margin-bottom: 5px;">JULIO'S PIZZA HOUSE</div>
                  <img 
                    src="${imageUrl}" 
                    alt="Assinatura" 
                    width="150"
                  />
                </div>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <button onclick="window.print()">Imprimir</button>
              </div>
              <script>
                // Verificar se a imagem carregou corretamente
                window.onload = function() {
                  const img = document.querySelector('.receipt-footer img');
                  img.onerror = function() {
                    console.error('Erro ao carregar imagem');
                    img.src = '${window.location.origin}/lovable-uploads/340c9b38-0cac-4c58-a897-54ee0dd2412b.png';
                  };
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const amountInWords = numberToWords(contractData.downPayment).toUpperCase();
  
  return (
    <Card className="shadow-md border border-border/40">
      <CardHeader>
        <CardTitle className="text-center">Recibo de Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={receiptRef} className="receipt">
          <div className="border-2 border-black rounded-[20px] p-5 relative">
            <div className="flex items-center mb-6">
              <div className="text-3xl font-bold mr-2">RECIBO</div>
              <div className="ml-2">Nº</div>
              <div className="bg-gray-400 text-black px-4 py-1 mx-2 font-bold">{receiptNumber}</div>
              <div className="ml-2">VALOR</div>
              <div className="bg-gray-400 text-black px-4 py-1 mx-2 font-bold">
                {formatCurrency(contractData.downPayment)}
              </div>
            </div>
            
            <div className="mb-4 flex">
              <div className="w-[150px]">Recebi(emos) de</div>
              <div className="flex-1 border-b border-black font-bold uppercase">
                {contractData.clientName}
              </div>
            </div>
            
            <div className="mb-4 flex">
              <div className="w-[150px]">a quantia de</div>
              <div className="flex-1 border-b border-black font-bold uppercase">
                {amountInWords}
              </div>
            </div>
            
            <div className="mb-4 flex">
              <div className="w-[150px]">Correspondente a</div>
              <div className="flex-1 border-b border-black font-bold uppercase">
                ENTRADA DO EVENTO A SE REALIZAR NA DATA DE {contractData.eventDate}
              </div>
            </div>
            
            <div className="mb-4 border-b border-black"></div>
            
            <div className="mb-8">
              e para clareza firmo(amos) o presente
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t bg-muted/20 p-4">
        <Button onClick={handlePrint} className="min-w-[200px]">
          <PrinterIcon className="mr-2 h-4 w-4" />
          Imprimir / Salvar PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Receipt;
