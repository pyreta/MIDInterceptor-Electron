import Chord from '../Chord';

describe('Chord', () => {
  const D_minor_in_C_Dorian = new Chord({ key: 0, scale: 'major', mode: 2, chord: 2, notes: { 1: 0, 3: 0, 5: 0 }});
  const D_Major_in_Csharp_Phrygian = new Chord({ key: 1,  scale: 'major', mode: 3,  chord: 2, notes: { 1: 0, 3: 0, 5: 0 } });
  const DsharpDim_in_Dsharp_Locrian = new Chord({ key: 3, scale: 'minor', mode: 2, chord: 1, notes: { 1: 0, 3: 0, 5: 0 } });
  const E7_in_PhrygDom = new Chord({ key: 4, scale: 'harmonicMinor', mode: 5, chord: 1, notes: { 1: 0, 3: 0, 5: 0, 7:0 } });
  const Fsharp_minorMajor7_in_HarmonicMinor = new Chord({ key: 6, scale: 'harmonicMinor', mode: 1, chord: 1, notes: { 1: 0, 3: 0, 5: 0, 7:0 } });
  const Em9inC = new Chord({ key: 0, scale: 'major', mode: 1, chord: 3, notes: { 1: 0, 3: 0, 5: 0, 7: 0, 9: 0 } });
  const Esus2inC = new Chord({ key: 0, scale: 'major', mode: 1, chord: 3, notes: { 1: 0, 2: 0, 5: 0 } });
  const AMsus2 = new Chord({ key: 9, scale: 'major', mode: 1, chord: 1, notes: { 1: 0, 2: 0, 5: 0 } });
  const FMsus4 = new Chord({ key: 0, scale: 'major', mode: 1, chord: 4, notes: { 1: 0, 4: 0, 5: 0 } });
  const G7 = new Chord( {key: 0, scale: 'major', mode: 1, chord: 5, notes: { 1: 0, 3: 0, 5: 0, 7: 0 } });
  const A7 = new Chord( {key: 2, scale: 'major', mode: 1, chord: 5, notes: { 1: 0, 3: 0, 5: 0, 7: 0 } });

  it('has a key', () => {
    expect(D_minor_in_C_Dorian.key().name()).toEqual('C');
    expect(D_minor_in_C_Dorian.key().value()).toEqual(0);
    expect(D_Major_in_Csharp_Phrygian.key().name()).toEqual('C♯');
    expect(D_Major_in_Csharp_Phrygian.key().value()).toEqual(1);
  });

  it('has a scale', () => {
    expect(E7_in_PhrygDom.getScale().name()).toEqual('Harmonic Minor');
    expect(DsharpDim_in_Dsharp_Locrian.getScale().name()).toEqual('Minor');
    expect(D_minor_in_C_Dorian.getScale().name()).toEqual('Major');
  });

  it('has notes', () => {
    expect(D_minor_in_C_Dorian.noteNames()).toEqual(['D', 'F', 'A']);
    expect(D_Major_in_Csharp_Phrygian.noteNames()).toEqual(['D', 'F♯', 'A']);
    expect(DsharpDim_in_Dsharp_Locrian.noteNames()).toEqual(['D♯', 'F♯', 'A']);
    expect(E7_in_PhrygDom.noteNames()).toEqual(['E', 'G♯', 'B', 'D']);
    expect(
      new Chord({
        key: 0,
        scale: 'major',
        mode: 1,
        chord: 1,
        notes: { 1: 0, 3: 0, 5: 0 },
      }).noteNames(),
    ).toEqual(['C', 'E', 'G']);
    expect(AMsus2.noteValues()).toEqual([9, 11, 16]);
    expect(AMsus2.noteNames()).toEqual(['A', 'B', 'E']);
    expect(FMsus4.noteNames()).toEqual(['F', 'A♯', 'C']);
  });

  it('uses true intervals outside core chord even when outside scale', () => {
    expect(Em9inC.noteNames()).toEqual(['E', 'G', 'B', 'D', 'F♯']);
    expect(Esus2inC.noteNames()).toEqual(['E', 'F♯', 'B']);
  });

  it('has a mode', () => {
    expect(D_minor_in_C_Dorian.getMode().name()).toEqual('Dorian');
    expect(D_Major_in_Csharp_Phrygian.getMode().name()).toEqual('Phrygian');
    expect(DsharpDim_in_Dsharp_Locrian.getMode().name()).toEqual('Locrian');
    expect(E7_in_PhrygDom.getMode().name()).toEqual('Phrygian Dominant');
  });

  it('has a root', () => {
    expect(D_minor_in_C_Dorian.root().name()).toEqual('D');
    expect(D_minor_in_C_Dorian.root().value()).toEqual(2);
    expect(E7_in_PhrygDom.root().name()).toEqual('E');
    expect(E7_in_PhrygDom.root().value()).toEqual(4);
    expect(DsharpDim_in_Dsharp_Locrian.root().name()).toEqual('D♯');
    expect(DsharpDim_in_Dsharp_Locrian.root().value()).toEqual(3);
  });

  it('has an analysis', () => {
    expect(D_minor_in_C_Dorian.analyze()).toEqual({ 3: 'minor', 5: 'perfect'});
    expect(D_Major_in_Csharp_Phrygian.analyze()).toEqual({ 3: 'major', 5: 'perfect'});
    expect(DsharpDim_in_Dsharp_Locrian.analyze()).toEqual({ 3: 'minor', 5: 'flat'});
    expect(E7_in_PhrygDom.analyze()).toEqual({ 3: 'major', 5: 'perfect', 7: 'minor'});
  });

  it('has a signature', () => {
    expect(D_minor_in_C_Dorian.signature()).toEqual('minor3perfect5');
    expect(D_Major_in_Csharp_Phrygian.signature()).toEqual('major3perfect5');
    expect(DsharpDim_in_Dsharp_Locrian.signature()).toEqual('minor3flat5');
    expect(E7_in_PhrygDom.signature()).toEqual('major3perfect5minor7');
    expect(AMsus2.signature()).toEqual('major2perfect5');
  });

  it('has a name', () => {
    expect(D_minor_in_C_Dorian.name()).toEqual('Dm');
    expect(D_Major_in_Csharp_Phrygian.name()).toEqual('DM');
    expect(DsharpDim_in_Dsharp_Locrian.name()).toEqual('D♯dim');
    expect(E7_in_PhrygDom.name()).toEqual('E7');
    expect(Fsharp_minorMajor7_in_HarmonicMinor.name()).toEqual('F♯mM7');
  });

  it('can have a note added', () => {
    expect(D_minor_in_C_Dorian.addNote(7).name()).toEqual('Dm7');
    expect(D_minor_in_C_Dorian.addNote(6).name()).toEqual('Dm6');
    expect(D_minor_in_C_Dorian.addNote(13).name()).toEqual('Dm13');
    expect(D_Major_in_Csharp_Phrygian.addNote(6).name()).toEqual('D6');
    expect(D_Major_in_Csharp_Phrygian.addNote(6).noteNames()).toEqual(['D', 'F♯', 'A', 'B']);
  });

  it('can have a note removed', () => {
    expect(D_minor_in_C_Dorian.addNote(7).removeNote(7).name('abreviation')).toEqual('Dm');
  });

  it('can be suspended', () => {
    expect(D_minor_in_C_Dorian.sus().name()).toEqual('Dsus4');
    expect(D_minor_in_C_Dorian.sus(2).name()).toEqual('Dsus2');
    expect(D_minor_in_C_Dorian.sus(2,4).name()).toEqual('Dsus42');
    expect(D_minor_in_C_Dorian.sus(4,2,6).name()).toEqual('Dsus42');
  });

  it('creates a secondary dominant', () => {
    expect(D_minor_in_C_Dorian.secondaryDominant().name()).toEqual('A7');
  });

  it('has tritone substitution', () => {
    expect(G7.tritoneSubstitution().name()).toEqual('C♯7');
    expect(A7.tritoneSubstitution().name()).toEqual('D♯7');
    expect(A7.diminishedSubstitution().name()).toEqual('C♯dim7');
  });

  it('creates a default chord from root', () => {
    const gM = Chord.fromRoot(7);
    expect(gM.name()).toEqual('GM');
    expect(gM.key().name()).toEqual('G');
    const g7 = gM.makeDominantFifth();
    expect(g7.name()).toEqual('G7');
    expect(g7.key().name()).toEqual('C');
  });

  it('substitutes a minor 4th', () => {
    expect(G7.fourthMinorSubstitution().name()).toEqual('Fm');
    expect(G7.fourthMinorSubstitution().addNote(7).name()).toEqual('Fm7');
  });

  it('creates a chromatic substitution', () => {
    expect(G7.chromaticSubstitution()[0].name()).toEqual('G♯7');
    expect(G7.chromaticSubstitution()[1].name()).toEqual('G7');
  });

  it('creates a 2/5 substitution', () => {
    expect(G7.twoFiveSubstitution()[0].name()).toEqual('Dm');
    expect(G7.chromaticSubstitution()[1].name()).toEqual('G7');
  });

  it('creates default triads', () => {
    expect(Chord.fromMinorScale(1).name()).toEqual('Cm');
    expect(Chord.fromMinorScale(2).name()).toEqual('Ddim');
    expect(Chord.fromMinorScale(3).name()).toEqual('D♯M');
    expect(Chord.fromMajorScale(1).name()).toEqual('CM');
    expect(Chord.fromMajorScale(2).name()).toEqual('Dm');
    expect(Chord.fromMajorScale(3).name()).toEqual('Em');
  });

  it('creates roman numerals', () => {
    expect(new Chord().romanNumeral()).toEqual('I');
    expect(Chord.fromMajorScale(2).romanNumeral()).toEqual('ii');
    expect(Chord.fromMajorScale(3).romanNumeral()).toEqual('iii');
    expect(Chord.fromMinorScale(1).romanNumeral()).toEqual('i');
    expect(Chord.fromMinorScale(2).romanNumeral()).toEqual('ii°');
    expect(Chord.fromMinorScale(3).romanNumeral()).toEqual('III');
  });

  it('has a voicing', () => {
    const cChord = new Chord();
    expect(cChord.get('voicing')).toEqual({ 1: [0], 3: [0], 5: [0] });
    expect(cChord.voicing().noteValues()).toEqual([60, 64, 67]);
    expect(cChord.voicing().noteNames()).toEqual(['C', 'E', 'G']);
    expect(new Chord({voicing: { 1: [-2, 0], 3: [1], 5: [1, 2]} })
      .voicing()
      .noteValues())
      .toEqual([36, 60, 76, 79, 91]);
    expect(new Chord({voicing: { 1: [-2, 0], 3: [1, 2], 5: [1] }})
      .voicing()
      .noteNames())
      .toEqual(['C', 'C', 'E', 'G', 'E']);
  });

  it('matches voicing to another chord', () => {
    const Amin = new Chord({ chord: 6 });
    const Cmaj = new Chord();
    expect(Amin.name()).toEqual('Am');
    expect(Amin.matchVoicingToChord(Cmaj)
      .voicing()
      .noteValues())
      .toEqual([60, 64, 69]);
    });
});
