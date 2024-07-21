import {  useRef, useState} from 'react';
import React from 'react';
import Canvas from './components/canvas';
import { ChakraProvider } from '@chakra-ui/react'
import { Button, Box, VStack,Textarea } from '@chakra-ui/react'

function App() {
  const canvasRef = useRef(null);
  const [text, setText] = useState(""); 

  const handleDetectText = () => {
    if (canvasRef.current) {
      canvasRef.current.sendImage(setText); 
    }
  };
  return (
    <ChakraProvider>

      <nav style={{ backgroundColor: '#333',textAlign:'center', padding: '1rem', color: 'white' }}>
        <h1 style={{fontSize:"40px"}} className='text-align:center;'>Hand2Text</h1>
        <p>Write anything in the box and click the button to get the text</p>
      </nav>
      <Canvas ref={canvasRef}/>
      <VStack style={{marginBottom:"102px"}}>
        <Box>
          <Button onClick={handleDetectText}>
            Detect Text
          </Button>
        </Box>
        <Box>
          <Textarea style={{width:"800px",height:'100px'}} value={text} placeholder='Click the detect text button and wait while your text is being detected. First detection could take a while' />
        </Box>
      </VStack>
      <footer style={{ backgroundColor: '#333', padding: '1rem' ,color: 'white', textAlign: 'center', marginTop: 'auto' }}>
        <p>Made with ❤️ by <a href="https://github.com/RamiSmat" target="_blank" style={{ color: "white"}}>Rami Smat </a></p>
      </footer>
    </ChakraProvider>
  );
}

export default App;
