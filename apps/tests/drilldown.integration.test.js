test('drill‑down roll‑up round‑trip', () => {
    const parent = sampleSnap();            // one row × one cell
    const child  = sampleSnap({ weight: 10 });
    parent.grid[0].cells[0].drilldown = {
      snapshot_id: child.meta.id,
      reducer: 'sum',
      last_rollup: 0
    };
    const rolled = rollUp(child, 'sum');
    expect(rolled).toBe(10);
  });