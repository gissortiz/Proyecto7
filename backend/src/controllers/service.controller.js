const Service = require('../models/service.model');

exports.createService = async (req, res) => {
    const { name, description, price, duration, available } = req.body;
    try {
        const newService = await Service.create({ 
            name, 
            description, 
            price, 
            duration, 
            available
         });
        return res.json({ newService });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al crear el servicio',
            error: error.message
        })
    }
};

exports.getServices = async (req, res) => {

    try {
        const services = await Service.find({})
        return res.json({ services })
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al obtener los datos de los servicios',
            error: error.message
        })
    }
};

exports.getServicesById = async (req, res) => {

    try {
        const servicesById = await Service.findById(req.params.id)
        return res.json({ servicesById })
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al obtener el dato del servicio',
            error: error.message
        })
    }
};


exports.updateServiceById = async (req, res) => {
    const { name, description, price, duration, available } = req.body;
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { name, description, price, duration, available },  
            { new: true, runValidators: true }  
        );
        if (!updatedService)
            return res.status(404).json({ message: 'Servicio no encontrado' });
        return res.json({ updatedService });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al actualizar el servicio',
            error: error.message
        })
    }
};

exports.deleteServiceById = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService){
            return res.status(404).json({ message: 'Servicio no encontrado' }) ;
        }
        return res.status(200).json({deletedService});
    } catch (error){
      return res.status(500).json({
        msg: "Hubo un error borrando el servicio",
        error: error.message,
      });
    }
};
