import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import SomeExample from './src/abi/SomeExample.json';
 
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'SomeExample',
      abi: SomeExample,
    }
  ],
  plugins: [
    react(),
  ],
})