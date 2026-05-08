import { ModalDialogComponent } from './common/components/modal-dialog';
import { useVSCodeSync } from '#core/vscode/use-vscode-sync.hook';
import { MainScene } from './scenes/main.scene';

function App() {
  useVSCodeSync();

  return (
    <>
      <ModalDialogComponent />
      <MainScene />
    </>
  );
}

export default App;
