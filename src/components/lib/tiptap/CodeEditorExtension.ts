// src/lib/tiptap/extensions/CustomNoteCardExtension.js

import { Node, mergeAttributes } from '@tiptap/react';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { CodeEditor } from '../../CodeEditor';

export const CustomNoteCardExtension = Node.create({
  // 1. NOME DA EXTENSÃO (ÚNICO)
  name: 'customNoteCard',

  // 2. CONFIGURAÇÕES DO NÓ
  group: 'block', // 'block' para ocupar sua própria linha, 'inline' para ficar junto com o texto
  atom: true, // Trata o nó como uma unidade única, indivisível. O cursor não pode entrar nele.


  // 4. PARSE & RENDER (COMO LER/ESCREVER HTML)
  // Como o Tiptap deve ler este nó a partir de um HTML existente
  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-note-card"]',
      },
    ];
  },

  // Como o Tiptap deve escrever este nó para HTML
  renderHTML({ HTMLAttributes }) {
    // mergeAttributes junta os atributos definidos com quaisquer outros que possam ser passados
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'custom-note-card' })];
  },

  // 5. ONDE A MÁGICA ACONTECE!
  // Conecta o nó Tiptap ao nosso componente React
  addNodeView() {
    return ReactNodeViewRenderer(CodeEditor);
  },
});