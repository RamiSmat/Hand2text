import { useEffect, 
         useRef, 
         useState, 
         forwardRef, 
         useImperativeHandle } from 'react';

const Canvas = forwardRef ((props,ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth *2;
    canvas.height = window.innerHeight ;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight/2}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  const sendImage = async (setText) => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    console.log("enterd send image")
    try {
        console.log("enterd request")
        console.log(JSON.stringify({ image:image }))
      const response = await fetch('http://localhost:5000/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image:image }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result.text);
      setText(result.text); 
    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }
  };

  useImperativeHandle(ref, () => ({
    sendImage
  }));
  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
});

export default Canvas;
