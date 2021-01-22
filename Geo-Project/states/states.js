const State = require('../dbModels/state_model');

module.exports = app => {

app.post('/api/states', (req, res) => {
    const newState = {
        st_name: req.body.st_name,
        st_code: req.body.st_code,
        st_capital : req.body.st_capital
    }

    createState(newState).then(st => res.send(st));
});

app.get('/api/states', (req, res) => {
    getStatesList().then(sts => res.send(sts));
});

app.put('/api/states', (req, res) => {
    const updatedState = {
        st_id: req.body.st_id,
        st_name: req.body.st_name,
        st_code: req.body.st_code,
        st_capital: req.body.st_capital
    }

    updateState(updatedState).then(st => {
        res.send(st);
    });

});

app.delete('/api/states/:st_id', (req, res) => {
    removeState(req.params.st_id).then(() => {
        res.send("state removed from database");
    })
});

}
//--------------------------------------------------


async function createState(st) {
    const state = new State(st);
    const createdState = await state.save();
    return createdState;
}


async function getStatesList() {
    let UI_states = [];
    const states = await State.find();
    states.forEach(state => {
        const states_frontend = {
            st_id: state._id,
            st_name: state.st_name,
            st_code: state.st_code,
            st_capital: state.st_capital
        }

        UI_states.push(states_frontend);
    });
    return UI_states;
}


async function updateState(state) {
    const stateById = await State.findById({_id: state.st_id});

    stateById.st_name = state.st_name;
    stateById.st_code = state.st_code;
    stateById.st_capital = state.st_capital;

    const editedState = stateById.save();
    return editedState;
}
// updateState(


async function removeState(id) {
    const state = await State.findByIdAndRemove(id, {useFindAndModify: false });

}
// removeState("5ff7db957726e40868c6dcb6");



