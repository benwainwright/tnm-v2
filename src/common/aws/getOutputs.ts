export const getOutputs = async () => {
  const outputs = await fetch("/backend-outputs.json")
  return outputs.json()
}
