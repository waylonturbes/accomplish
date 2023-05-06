import { Button, Text, VStack } from "@chakra-ui/react";

import { useCount } from "./hooks/useCount";

function App() {
  const { count, handleCountChange } = useCount();

  return (
    <VStack>
      <Text>{count}</Text>
      <Button
        onClick={() => {
          handleCountChange("increment");
        }}
      >
        Up Count
      </Button>
    </VStack>
  );
}

export default App;
