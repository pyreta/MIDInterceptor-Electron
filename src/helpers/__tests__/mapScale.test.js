import mapScale from '../mapScale';

describe('mapScale', () => {
  it('maps a note to key and mode passed in', () => {

    const F = mapScale(60, { key: 5, mode: 3 });
    const Fsharp = mapScale(62, { key: 5, mode: 3 });
    const Gsharp = mapScale(64, { key: 5, mode: 3 });
    const Asharp = mapScale(65, { key: 5, mode: 3 });
    const C = mapScale(67, { key: 5, mode: 3 });
    const Csharp = mapScale(69, { key: 5, mode: 3 });
    const Dsharp = mapScale(71, { key: 5, mode: 3 });

    expect(F).toEqual(65);
    expect(Fsharp).toEqual(66);
    expect(Gsharp).toEqual(68);
    expect(Asharp).toEqual(70);
    expect(C).toEqual(72);
    expect(Csharp).toEqual(73);
    expect(Dsharp).toEqual(75);
    expect(mapScale(55, { key: 3, mode: 5 })).toEqual(58);
  });
});
