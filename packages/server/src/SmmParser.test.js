const SmmParser = require('./SmmParser.js');


test('SmmParser.EatPacket correctly extracts the first packet', () => {
  let [ packet, buf ] = SmmParser.EatPacket(Buffer.from('no packet'));
  expect(packet).toBeNull();
  expect(buf.toString()).toBe('no packet');

  [ packet, buf ] = SmmParser.EatPacket(Buffer.from('blah {key:value} blah'));
  expect(packet).toMatchObject({ key: 'key', value: 'value' });
  expect(buf.toString()).toBe(' blah');

  [ packet, buf ] = SmmParser.EatPacket(Buffer.from('{{:{key:value}{}::} blah'));
  expect(packet).toMatchObject({ key: 'key', value: 'value' });
  expect(buf.toString()).toBe('{}::} blah');

  [ packet, buf ] = SmmParser.EatPacket(buf);
  expect(packet).toBeNull();
  expect(buf.toString()).toBe('{}::} blah');

  [ packet, buf ] = SmmParser.EatPacket(Buffer.from('{key:value}{key2:value2}'));
  expect(packet).toMatchObject({ key: 'key', value: 'value' });
  expect(buf.toString()).toBe('{key2:value2}');

  [ packet, buf ] = SmmParser.EatPacket(buf);
  expect(packet).toMatchObject({ key: 'key2', value: 'value2' });
  expect(buf.toString()).toBe('');
});


test('SmmParser correctly parses data', () => {
  const parser = new SmmParser();
  let parses = [];
  parser.on('data', data => parses.push(data));
  parser.write(Buffer.from('{key:value} blah {lock:key} {}: malformed ::}{{} {pad:thai}'));
  return new Promise(resolve => {
    parser.on('end', resolve);
    parser.end();
  }).then(() => {
    expect(parses.length).toBe(3);
    expect(parses[0]).toMatchObject({key: 'key', value: 'value'});
    expect(parses[1]).toMatchObject({key: 'lock', value: 'key'});
    expect(parses[2]).toMatchObject({key: 'pad', value: 'thai'});
  });
});
