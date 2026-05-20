/**
 * Adiciona marca d'água (watermark) com GPS, data e hora na imagem
 */

export interface WatermarkOptions {
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  componentName?: string;
  anomalyName?: string;
}

export async function addWatermarkToImage(
  imageFile: File,
  options: WatermarkOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!imageFile) {
      reject(new Error('Arquivo de imagem não fornecido'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        reject(new Error('Erro ao ler arquivo de imagem'));
        return;
      }

      const img = new Image();
      
      // Timeout para carregar imagem
      const loadTimeout = setTimeout(() => {
        reject(new Error('Timeout ao carregar imagem para watermark'));
      }, 5000);

      img.onload = () => {
        clearTimeout(loadTimeout);

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Não foi possível obter contexto do canvas'));
          return;
        }

        try {
          // Desenhar a imagem original
          ctx.drawImage(img, 0, 0);

          // Configurar estilo de texto
          const fontSize = Math.max(20, img.width / 40); // Responsivo ao tamanho da imagem
          ctx.font = `bold ${fontSize}px Arial, sans-serif`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.lineWidth = 2;
          ctx.textAlign = 'left';

          // Padding da marca d'água
          const padding = 15;
          let y = canvas.height - padding - (fontSize * 4.5);

          // Função para desenhar texto com contorno (legível)
          const drawTextWithStroke = (text: string, x: number, yPos: number) => {
            ctx.strokeText(text, x, yPos);
            ctx.fillText(text, x, yPos);
          };

          // Linha 1: Componente + Anomalia
          if (options.componentName || options.anomalyName) {
            const componentText = `${options.componentName || 'Foto'} ${
              options.anomalyName ? `- ${options.anomalyName}` : ''
            }`.trim();
            drawTextWithStroke(componentText, padding, y);
            y += fontSize * 1.3;
          }

          // Linha 2: Data e Hora
          const now = new Date();
          const dateTimeText = now.toLocaleString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          drawTextWithStroke(`Data/Hora: ${dateTimeText}`, padding, y);
          y += fontSize * 1.3;

          // Linha 3: Coordenadas GPS
          if (options.latitude !== undefined && options.longitude !== undefined) {
            const gpsText = `GPS: ${options.latitude.toFixed(5)}, ${options.longitude.toFixed(5)}`;
            drawTextWithStroke(gpsText, padding, y);
            y += fontSize * 1.3;

            // Linha 4: Precisão
            if (options.accuracy !== undefined) {
              const accuracyText = `Precisão: ±${options.accuracy.toFixed(1)}m`;
              drawTextWithStroke(accuracyText, padding, y);
            }
          } else {
            // Se não tem GPS, escrever "Sem GPS"
            const noGpsText = 'GPS: Não capturado';
            drawTextWithStroke(noGpsText, padding, y);
          }

          // Converter canvas para blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Erro ao converter canvas para blob'));
              }
            },
            'image/jpeg',
            0.95
          );
        } catch (err) {
          reject(new Error(`Erro ao desenhar watermark: ${err}`));
        }
      };

      img.onerror = () => {
        clearTimeout(loadTimeout);
        reject(new Error('Erro ao carregar imagem'));
      };

      img.src = dataUrl;
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo de imagem'));
    };

    reader.readAsDataURL(imageFile);
  });
}

/**
 * Adiciona watermark a partir de base64 (para canvas capture)
 */
export async function addWatermarkToCanvas(
  canvasImage: HTMLCanvasElement,
  options: WatermarkOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Validar que o canvas tem dimensões
    if (canvasImage.width === 0 || canvasImage.height === 0) {
      reject(new Error('Canvas inválido: dimensões zeradas'));
      return;
    }

    // Converter canvas para dataURL
    let dataUrl: string;
    try {
      dataUrl = canvasImage.toDataURL('image/jpeg', 0.95);
      if (!dataUrl || dataUrl.length < 100) {
        reject(new Error('Canvas vazio ou inválido'));
        return;
      }
    } catch (err) {
      reject(new Error(`Erro ao converter canvas para dataURL: ${err}`));
      return;
    }

    const img = new Image();
    
    // Timeout para carregar imagem
    const loadTimeout = setTimeout(() => {
      reject(new Error('Timeout ao carregar imagem para watermark'));
    }, 5000);

    img.onload = () => {
      clearTimeout(loadTimeout);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Não foi possível obter contexto do canvas'));
        return;
      }

      try {
        // Desenhar a imagem original
        ctx.drawImage(img, 0, 0);

        // Configurar estilo de texto
        const fontSize = Math.max(20, img.width / 40);
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.textAlign = 'left';

        const padding = 15;
        let y = canvas.height - padding - (fontSize * 4.5);

        const drawTextWithStroke = (text: string, x: number, yPos: number) => {
          ctx.strokeText(text, x, yPos);
          ctx.fillText(text, x, yPos);
        };

        // Linha 1: Componente + Anomalia
        if (options.componentName || options.anomalyName) {
          const componentText = `${options.componentName || 'Foto'} ${
            options.anomalyName ? `- ${options.anomalyName}` : ''
          }`.trim();
          drawTextWithStroke(componentText, padding, y);
          y += fontSize * 1.3;
        }

        // Linha 2: Data e Hora
        const now = new Date();
        const dateTimeText = now.toLocaleString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        drawTextWithStroke(`Data/Hora: ${dateTimeText}`, padding, y);
        y += fontSize * 1.3;

        // Linha 3: Coordenadas GPS
        if (options.latitude !== undefined && options.longitude !== undefined) {
          const gpsText = `GPS: ${options.latitude.toFixed(5)}, ${options.longitude.toFixed(5)}`;
          drawTextWithStroke(gpsText, padding, y);
          y += fontSize * 1.3;

          if (options.accuracy !== undefined) {
            const accuracyText = `Precisão: ±${options.accuracy.toFixed(1)}m`;
            drawTextWithStroke(accuracyText, padding, y);
          }
        } else {
          const noGpsText = 'GPS: Não capturado';
          drawTextWithStroke(noGpsText, padding, y);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Erro ao converter canvas para blob'));
            }
          },
          'image/jpeg',
          0.95
        );
      } catch (err) {
        reject(new Error(`Erro ao desenhar watermark: ${err}`));
      }
    };

    img.onerror = () => {
      clearTimeout(loadTimeout);
      reject(new Error('Erro ao carregar imagem do canvas'));
    };

    img.src = dataUrl;
  });
}
