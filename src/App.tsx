import { ModalDialogComponent } from './common/components/modal-dialog/modal-dialog.component';
import { MainScene } from './scenes/main.scene';

function App() {
  return (
    <>
      <MainScene />
      <ModalDialogComponent children={'Hola, soy el children desde App.tsx'} />
    </>
  );
}

export default App;
