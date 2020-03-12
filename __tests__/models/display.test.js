const mongoose = require('mongoose');
const Display = require('../../models/display');

describe('Display model', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        await connection.disconnect();
    });

    it('should save correctly', async () => {
        let display = new Display({
            _id: 'ABC123',
            active: true,
            description: 'A description text',
            location: 'The Cupboard under the Stairs'
        });
        let savedDisplay = await display.save();
        expect(savedDisplay._id).toBe('ABC123');
        expect(savedDisplay.active).toBeTruthy();
        expect(savedDisplay.description).toBe('A description text');
        expect(savedDisplay.location).toBe('The Cupboard under the Stairs');
        expect(savedDisplay.createdAt).toBeInstanceOf(Date);
        expect(savedDisplay.updatedAt).toBeInstanceOf(Date);
    });

    it('should define default values', async () => {
        let display = new Display({ _id: 'ABC' })
        let savedDisplay = await display.save();
        expect(savedDisplay._id).toBe('ABC');
        expect(savedDisplay.active).toBeFalsy();
        expect(savedDisplay.description).toBe('');
        expect(savedDisplay.groups).toBeInstanceOf(Array);
        expect(savedDisplay.groups.length).toBe(0);
        expect(savedDisplay.lastSeen).toBeNull();
        expect(savedDisplay.location).toBe('');
    });

    it('should ignore unknown properties', async () => {
        let display = new Display({ _id: '123', madeUpProp: 'hello' })
        let savedDisplay = await display.save();
        expect(savedDisplay._id).toBe('123');
        expect(savedDisplay.madeUpProp).not.toBeDefined();
    });
});