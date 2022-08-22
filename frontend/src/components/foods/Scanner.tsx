// logic
import { useEffect } from 'react';
// eslint-disable-next-line
// @ts-ignore
import Quagga from 'quagga';
import { toast } from 'react-toastify';

const QuaggaConfig = {
  inputStream: {
    type: 'LiveStream',
    constraints: {
      width: { min: 450 },
      height: { min: 300 },
      facingMode: 'environment',
      aspectRatio: { min: 1, max: 2 },
    },
  },
  locator: {
    patchSize: 'medium',
    halfSample: true,
  },
  numOfWorkers: 2,
  frequency: 10,
  decoder: {
    readers: ['ean_reader'],
  },
  locate: true,
};

type ParamsType = {
  open: boolean;
  setBarcode: any;
};

export default function Scanner({ open, setBarcode }: ParamsType) {
  if (!open) {
    Quagga.stop();
    return null;
  }

  useEffect(() => {
    Quagga.init(QuaggaConfig, (err: any) => {
      if (err) toast.error('Error al iniciar la cámara.');
      Quagga.start();
      return () => {
        Quagga.stop();
      };
    });

    // detecting boxes on stream
    Quagga.onProcessed((result: any) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, Number(drawingCanvas.getAttribute('width')), Number(drawingCanvas.getAttribute('height')));
          result.boxes
            .filter((box: any) => box !== result.box)
            .forEach((box: any) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });

    Quagga.onDetected((result: any) => setBarcode(result.codeResult.code));
  }, []);

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div
      id="interactive"
      className="viewport"
    />
  );
}
