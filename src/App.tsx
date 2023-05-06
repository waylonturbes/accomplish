import { useState } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <VStack>
      <Text>{count}</Text>
      <Button
        onClick={() => {
          setCount((v) => v + 1);
        }}
      >
        Up Count
      </Button>
    </VStack>
  );
}

export default App;
