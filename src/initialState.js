export default {
    game: {
        status: 'over',
        range: {
            min: 0,
            max: 400,
        },
        size: {
            width: 288,
            height: 512,
        },
    },
    player: {
        score: 0,
    },
    bird: {
        size: {
            width: 34,
            height: 24,
        },
        status: 'normal',
        height: 188,
        targetHeight: 188,
        originalHeight: 188,
        flyHeight: 30,
        flyTime: 150,
        dropTime: 2500,
        timestamp: 0,
    },

    pipings: {
        timestamp: 0,
        interval: 2600,
        speed: 1800,
        size: {
            width: 52,
        },
        range: {
            x: {
                min: 0,
                max: 340,
            },
            y: {
                min: 40,
                max: 242,
            },
            gap: 112,
        },
        list: [],
    },
}
