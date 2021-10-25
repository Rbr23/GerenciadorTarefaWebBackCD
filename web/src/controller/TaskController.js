const TaskModel = require('../model/TaskModel');

//A controller faz o tráfego, recebendo e enviando respostas
class TaskController{

    //método reponsável por receber a requisição de armazenamento no banco de dados e criar esse armazenamento
    async create(req, res){
        //recebe a requisição do front
        const task = new TaskModel(req.body);
        //salva no banco de dados
        await task
        .save() 
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

        // save() => método utilizado para salvar os dados que vem do front no banco de dados
        //then() => resposta positiva, caso o salvamento for bem sucedido
        //catch () => tratamento de erro, caso for mal sucedido

    }


    async update(req, res){

        await TaskModel
        .findByIdAndUpdate({'_id':req.params.id}, req.body, {new: true})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }

    async readAll(req, res){

        await TaskModel
        .find({macadress: {'$in': req.body.macadress}})
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }

    async readById(req, res){

        await TaskModel.findById(req.params.id)
        .then(response => {
            if(response)
                return res.status(200).json(response)
            else 
                return res.status(404).json({error : 'Tarefa não encontrada'})
            })
        .catch(error => {return res.status(500).json(error)});

    }

    async delete(req, res){

        await TaskModel
        .deleteOne({'_id':req.params.id})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});

    }

    

}

module.exports = new TaskController();