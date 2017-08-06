import { notes } from '../constants';
import { rect } from './helpers';

class DualCanvasPiano {
  constructor(ctx, {
    octaves = 1,
    x = 0,
    y = 0,
    colors = {},
    whiteKeyWidth = 32,
    whiteKeyHeight = 180,
    blackKeyWidth = 24,
    blackKeyHeight = 118,
    baseHeight = 190,
    whiteKeyFontSize = 16,
    blackKeyFontSize = 11,
    keyBorderRadius = 5,
    baseBorderRadius = 8,
    keyBorderWidth = 2,
    font = 'sans-serif'
  }) {
    this.ctx = ctx;
    ctx.textAlign="center";
    this.octaves = octaves;
    this.naturalNotes = notes.filter(note => !note.includes('#'));
    this.sharpNotes = notes.filter(note => note.includes('#'));
    this.colors = {
      base: 'rgba(33, 37, 43, 1)',
      baseBorder: '#181a1f',
      whiteKey: 'rgb(229, 192, 123)',
      whiteKeyFilter: '#98c379',
      whiteKeyBorder: 'rgb(33, 37, 43)',
      blackKey: 'rgb(33, 37, 43)',
      blackKeyBorder: 'rgb(222, 108, 117)',
      keyHold: 'rgba(195, 0, 0, 1)',
      ...colors
    };
    this.x = x;
    this.y = y;
    this.font = font;
    this.keyBorderRadius = keyBorderRadius;
    this.baseBorderRadius = baseBorderRadius;
    this.baseHeight = baseHeight;
    this.keyBorderWidth = keyBorderWidth;

    this.whiteKeyWidth = whiteKeyWidth;
    this.whiteKeyHeight = whiteKeyHeight;
    this.whiteKeyFontSize = whiteKeyFontSize;

    this.blackKeyHeight = blackKeyHeight;
    this.blackKeyWidth = blackKeyWidth;
    this.blackKeyFontSize = blackKeyFontSize;

    this.basePaddingSide = 15;
    this.basePaddingTop = 20;
    this.spaceBetweenPianos = 40;
    this.pianoWidth = this.octaves * 7 * this.whiteKeyWidth + this.basePaddingSide * 2;
    this.pianoHeight = this.whiteKeyHeight + this.basePaddingTop;
    this.totalHeight = 2 * this.pianoHeight + this.spaceBetweenPianos;

    this.filterPianoY = this.pianoHeight + this.spaceBetweenPianos;

    this.blackKeyX = this.x+this.basePaddingSide+this.whiteKeyWidth - this.blackKeyWidth/2;
    this.blackKeyY = this.y+(this.basePaddingTop-(this.blackKeyWidth/4 - 2));
  }

  drawBlackKey({ note, x, y, held, heldFilter }) {
    rect(this.ctx, {
      x,
      y,
      borderRadius: this.keyBorderRadius,
      fill: held ? this.colors.keyHold : this.colors.blackKey,
      borderWidth: this.keyBorderWidth,
      borderColor: held ? this.colors.whiteKeyBorder : this.colors.blackKeyBorder,
      width: this.blackKeyWidth,
      shadow: !held,
      height: this.blackKeyHeight + (held ? 4 : 0)
    });

    rect(this.ctx, {
      x,
      y: this.filterPianoY + this.basePaddingTop - 4,
      borderRadius: this.keyBorderRadius,
      fill: heldFilter ? this.colors.keyHold : this.colors.blackKey,
      borderWidth: this.keyBorderWidth,
      borderColor: heldFilter ? this.colors.whiteKeyBorder : this.colors.blackKeyBorder,
      width: this.blackKeyWidth,
      shadow: !heldFilter,
      height: this.blackKeyHeight + (heldFilter ? 4 : 0)
    });

    this.ctx.fillStyle = held ? this.colors.blackKey : this.colors.whiteKey;
    this.ctx.font = `400 ${this.blackKeyFontSize}px ${this.font}`;

    const noteX = x + this.blackKeyWidth/2;
    const noteY = y + this.blackKeyHeight - (this.blackKeyHeight/10 - 4);

    this.ctx.fillText(
      note,
      noteX,
      noteY + (held ? 4 : 0)
    )

    this.ctx.fillStyle = heldFilter ? this.colors.blackKey : this.colors.whiteKey;
    this.ctx.fillText(
      note,
      noteX,
      noteY + (heldFilter ? 4 : 0) + this.pianoHeight + this.basePaddingTop
    )

  }

  drawBlackKeys({ heldNotes, heldFilterNotes, octave }) {
    this.sharpNotes.forEach((note, idx) => {
      const spacer = ['F#', 'G#', 'A#'].includes(note) ?
        this.whiteKeyWidth : 0;
      const xOffset = idx * this.whiteKeyWidth + spacer + this.octaveSpacer(octave);
      this.drawBlackKey({
        note,
        x: this.blackKeyX + xOffset,
        y: this.blackKeyY,
        held: heldNotes[`${note}${octave}`],
        heldFilter: heldFilterNotes[`${note}${octave}`]
      })
    });
  }

  drawWhiteKey({ note, x, y, held, heldFilter }) {
    held && this.ctx.setTransform(1,0,0,1,0,7);

    rect(this.ctx, {
      x,
      y,
      borderRadius: this.keyBorderRadius,
      fill: held ? this.colors.keyHold : this.colors.whiteKey,
      borderWidth: this.keyBorderWidth,
      borderColor: this.colors.whiteKeyBorder,
      width: this.whiteKeyWidth,
      shadow: !held,
      height: this.whiteKeyHeight
    });

    this.ctx.setTransform(1,0,0,1,0,0)
    heldFilter && this.ctx.setTransform(1,0,0,1,0,7);

    rect(this.ctx, {
      x,
      y: this.filterPianoY + this.basePaddingTop,
      borderRadius: this.keyBorderRadius,
      fill: heldFilter ? this.colors.keyHold : this.colors.whiteKeyFilter,
      borderWidth: this.keyBorderWidth,
      borderColor: this.colors.whiteKeyBorder,
      width: this.whiteKeyWidth,
      shadow: !heldFilter,
      height: this.whiteKeyHeight
    });

    this.ctx.fillStyle = this.colors.blackKey;
    this.ctx.font = `400 ${this.whiteKeyFontSize}px ${this.font}`;

    const noteX = x + (this.whiteKeyWidth/2);
    const noteY = y + this.whiteKeyHeight - (this.whiteKeyHeight/10 - 8);

    held && this.ctx.setTransform(1,0,0,1,0,7);
    this.ctx.fillText(
      note,
      noteX,
      noteY
    );

    this.ctx.setTransform(1,0,0,1,0,0);
    heldFilter && this.ctx.setTransform(1,0,0,1,0,7);
    this.ctx.fillText(
      note,
      noteX,
      noteY + this.pianoHeight + this.basePaddingTop
    );

    this.ctx.setTransform(1,0,0,1,0,0);
  }

  drawWhiteKeys({ heldNotes, heldFilterNotes, octave }) {
    this.naturalNotes.forEach((note, idx) => {
      const xOffset = idx * this.whiteKeyWidth + this.octaveSpacer(octave);
      this.drawWhiteKey({
        note,
        x: this.x+this.basePaddingSide+xOffset,
        y: this.y+this.basePaddingTop,
        held: heldNotes[`${note}${octave}`],
        heldFilter: heldFilterNotes[`${note}${octave}`]
      });
    });
  }

  drawBase(x,y) {
    rect(this.ctx, {
      x,
      y,
      width: (this.octaves * this.whiteKeyWidth * 7) + (this.basePaddingSide * 2),
      height: this.baseHeight,
      borderRadius: this.baseBorderRadius,
      borderWidth: this.keyBorderWidth,
      fill: this.colors.base,
      borderColor: this.colors.baseBorder,
    })
  }

  octaveSpacer(octave) {
    return ((octave - 1) * (this.whiteKeyWidth * 7));
  }

  drawOctave({ heldNotes, heldFilterNotes, octave }) {
    this.drawWhiteKeys({ heldNotes, heldFilterNotes, octave });
    this.drawBlackKeys({ heldNotes, heldFilterNotes, octave });
  }

  draw({heldNotes = {}, heldFilterNotes = {}}) {
    this.ctx.clearRect(this.x, this.y, this.x + this.pianoWidth, this.y + this.totalHeight)
    this.drawBase(this.x,this.y);
    this.drawBase(this.x,this.filterPianoY);
    for (let i = 1; i <= this.octaves; i++) {
      this.drawOctave({ heldNotes, heldFilterNotes, octave: i });
    }
  }
}

export default DualCanvasPiano;
