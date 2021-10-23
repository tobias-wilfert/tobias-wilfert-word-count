'use babel';

import TobiasWilfertWordCountView from './tobias-wilfert-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  tobiasWilfertWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tobiasWilfertWordCountView = new TobiasWilfertWordCountView(state.tobiasWilfertWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tobiasWilfertWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tobias-wilfert-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tobiasWilfertWordCountView.destroy();
  },

  serialize() {
    return {
      tobiasWilfertWordCountViewState: this.tobiasWilfertWordCountView.serialize()
    };
  },

  toggle() {
      if (this.modalPanel.isVisible()) {
        this.modalPanel.hide();
      } else {
        const editor = atom.workspace.getActiveTextEditor();
        const words = editor.getText().split(/\s+/).length;
        this.tobiasWilfertWordCountView.setCount(words);
        this.modalPanel.show();
      }
}

};
