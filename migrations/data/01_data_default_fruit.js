
exports.seed = async function(knex) {
    await knex('fruit').insert([
        {id: 'd37f4fae-b572-47b3-93e0-17daf798f9d5',
            name: 'Banana',
            quantity: '0',
            description: 'Good for health',
        },
        {id: '51661376-0a07-449b-a3bd-9db79cd4ead4',
            name: 'Apple',
            quantity: '0',
            description: 'Keeps the doctor away',
        },
        {id: '69f6cd81-59fc-493b-8ebf-1b9f150ecead',
            name: 'Blueberry',
            quantity: '0',
            description: 'Antioxidant Superfood',
        }
    ])
}
