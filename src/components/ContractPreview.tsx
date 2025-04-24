import React, { useRef } from "react";
import { motion } from "framer-motion";
import { PrinterIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContractData, generateContractText } from "@/utils/contractGenerator";
import { saveContract } from "@/utils/storageUtils";
import { useToast } from "@/hooks/use-toast";

interface ContractPreviewProps {
  contractData: ContractData;
}

const ContractPreview: React.FC<ContractPreviewProps> = ({ contractData }) => {
  const contractRef = useRef<HTMLDivElement>(null);
  const contractText = generateContractText(contractData);
  const { toast } = useToast();

  const handlePrint = () => {
    if (contractRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const imageUrl = new URL('/lovable-uploads/340c9b38-0cac-4c58-a897-54ee0dd2412b.png', window.location.origin).href;
        
        printWindow.document.write(`
          <html>
            <head>
              <title>Contrato - Julio's Pizza House</title>
              <style>
                @page {
                  size: A4;
                  margin: 20mm;
                }
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  padding: 0;
                  max-width: 800px;
                  margin: 0 auto;
                }
                .contract-content {
                  text-align: justify;
                  font-size: 11pt;
                  margin-bottom: 20px;
                }
                h1 {
                  text-align: center;
                  margin-bottom: 20px;
                  font-size: 14pt;
                }
                .signature-container {
                  margin-top: 30px;
                  text-align: center;
                }
                .signature-container img {
                  width: 200px;
                  height: auto;
                  margin-top: 10px;
                }
                .company-name {
                  font-weight: bold;
                  font-size: 12pt;
                  margin-bottom: 10px;
                }
                @media print {
                  body { padding: 0; }
                  button { display: none; }
                  @page { margin: 20mm; }
                  .url { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="contract-content">
                ${contractRef.current.innerHTML}
              </div>
              <div class="signature-container">
                <div class="company-name">JULIO'S PIZZA HOUSE</div>
                <img 
                  src="${imageUrl}" 
                  alt="Assinatura"
                />
              </div>
              <div style="text-align: center; margin-top: 30px;">
                <button onclick="window.print()">Imprimir</button>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const handleSaveContract = () => {
    try {
      saveContract(contractData);
      toast({
        title: "Contrato salvo",
        description: "O contrato foi salvo com sucesso no histórico.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o contrato.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass overflow-hidden border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Visualização do Contrato</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <div 
              ref={contractRef}
              className="text-justify whitespace-pre-line text-sm font-mono leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: contractText.replace(/\n/g, '<br>') }}
            />
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center border-t bg-muted/20 p-4 gap-2">
          <Button onClick={handlePrint} className="min-w-[200px]">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Imprimir / Salvar PDF
          </Button>
          <Button onClick={handleSaveContract} variant="outline" className="min-w-[200px]">
            <Save className="mr-2 h-4 w-4" />
            Salvar Contrato
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ContractPreview;
