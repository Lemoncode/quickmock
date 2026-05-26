# QuickMock MCP Server

![Contributors](https://img.shields.io/github/contributors/Lemoncode/quickmock)
![Forks](https://img.shields.io/github/forks/Lemoncode/quickmock)
![Stars](https://img.shields.io/github/stars/Lemoncode/quickmock)
![Licence](https://img.shields.io/github/license/Lemoncode/quickmock)
![Issues](https://img.shields.io/github/issues/Lemoncode/quickmock)

## 🌟 Project

`@lemoncode/quickmock-mcp` is the MCP server for QuickMock.

It provides tools to inspect `.qm` wireframe files, read their content and pages, extract image assets, and generate rendered screenshots through a headless browser flow.

### Available tools

- `list_wireframes`: finds `.qm` files in the current workspace.
- `get_wireframe_json`: returns JSON content from a wireframe file.
- `get_wireframe_pages`: returns wireframe pages metadata.
- `get_wireframe_assets`: extracts embedded image assets to disk.
- `capture_wireframe`: renders and returns a PNG screenshot.

## 🚀 Installation

To work on this package locally from the monorepo:

```sh
git clone https://github.com/Lemoncode/quickmock.git
cd quickmock
npm install
```

Build the MCP package:

```bash
npm run build --workspace packages/mcp
```

Run it via stdio:

```bash
npx -y @lemoncode/quickmock-mcp
```

Inspect it with MCP Inspector:

```bash
npm run inspect --workspace packages/mcp
```

## 🤝 Contributing

Your feedback and contributions are welcome. If you find issues related to MCP tool behavior, wireframe parsing, or rendering output, please open an issue with reproduction steps and environment details.

## 🛠️ Technologies

The package is developed with:

- [TypeScript](https://www.typescriptlang.org/)
- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Puppeteer Core](https://pptr.dev/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)

## 👥 Team

Team members participating in this project:

<p align="left">
  <a href="https://github.com/LourdesRsdp">
    <kbd><img src="https://github.com/LourdesRsdp.png" alt="Lourdes Rodriguez" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/Franlop7">
    <kbd><img src="https://github.com/Franlop7.png" alt="Fran López" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/oleojake">
    <kbd><img src="https://github.com/oleojake.png" alt="Pablo Marzal" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/jsanzdev">
    <kbd><img src="https://github.com/jsanzdev.png" alt="Jesús Sanz" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/devrodrigolec">
    <kbd><img src="https://github.com/devrodrigolec.png" alt="Rodrigo Leciñana" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/deletidev">
    <kbd><img src="https://github.com/deletidev.png" alt="Leticia De La Osa" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
    <a href="https://github.com/monikMononoke">
    <kbd><img src="https://github.com/monikMononoke.png" alt="Mónika" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/Ivanruii">
    <kbd><img src="https://github.com/Ivanruii.png" alt="Ivan Ruíz" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  </a>
    <a href="https://github.com/raquetelio">
    <kbd><img src="https://github.com/raquetelio.png" alt="Raquel Toscano" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  </a>
    <a href="https://github.com/manugallegob">
    <kbd><img src="https://github.com/manugallegob.png" alt="Manuel Gallego" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/Bomasen">
    <kbd><img src="https://github.com/Bomasen.png" alt="Borja Martínez Sendra" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/Pableras90">
    <kbd><img src="https://github.com/Pableras90.png" alt="Pablo Reinaldo" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/Alber-Writer">
    <kbd><img src="https://github.com/Alber-Writer.png" alt="Alberto Escribano" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/El-Mito-de-Giralda">
    <kbd><img src="https://github.com/El-Mito-de-Giralda.png" alt="Jorge Miranda de la quintana" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/josemitoribio">
    <kbd><img src="https://github.com/josemitoribio.png" alt="Josemi Toribio" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
  <a href="https://github.com/sergioelmoreno">
    <kbd><img src="https://github.com/sergioelmoreno.png" alt="Sergio (El Moreno) del campo" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>  
  <a href="https://github.com/rojasadrian012">
    <kbd><img src="https://github.com/rojasadrian012.png" alt="Adrian Rojas" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>  
  <a href="https://github.com/omarlm">
    <kbd><img src="https://github.com/omarlm.png" alt="Omar Lorenzo" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>  
  <a href="https://github.com/iria-carballo">
    <kbd><img src="https://github.com/iria-carballo.png" alt="Iria Carballo" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>  
  <a href="https://github.com/marcosgiannini">
    <kbd><img src="https://github.com/marcosgiannini.png" alt="Marcos Giannini" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>  
  <a href="https://github.com/IonutGabi">
    <kbd><img src="https://github.com/IonutGabi.png" alt="Gabi Birsan" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>  
  <a href="https://github.com/antonio06">
    <kbd><img src="https://github.com/antonio06.png" alt="Antonio Contreras" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>  
  <a href="https://github.com/brauliodiez">
    <kbd><img src="https://github.com/brauliodiez.png" alt="Braulio Díez" width="50" height="50" style="border-radius: 50%;"></kbd>
  </a>
</p>
