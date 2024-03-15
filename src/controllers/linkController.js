const { Router } = require("express");
const router = Router();
const Link = require("../models/Link");
const date=require('./../assets/getDate');

router.get("/api/getLinks", async (req, res, next) => {
  try {
    const link = await Link.find({});
    if (!link) {
      return res
        .status(404)
        .send({ flagError: "S", mensaje: "No existe links para visualizar" });
    }
    const response = {
      flagError: "N",
      mensaje: "",
      data: link,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ flagError: "S", mensaje: "Error al momento de la búsqueda" });
  }
});

router.get("/api/getLink/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const link = await Link.findById({ _id: id });
    if (!link) {
      return res
        .status(404)
        .send({ flagError: "S", mensaje: "No existe el ID proporcionado" });
    }

    const response = {
      flagError: "N",
      mensaje: "",
      data: link,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ flagError: "S", mensaje: "Error al momento de la búsqueda" });
  }
});

router.post("/api/newLink", async (req, res, next) => {
  console.log("post....");

  try {
    const {
      nombre,
      url,
      ambiente
    } = req.body;
    
    // const fecha_alta=date.formatDate(new Date());
    // const fecha_alta=new Date();
    const fecha_alta=new Date();

    const link = new Link({
      nombre: nombre,
      url: url,
      ambiente: ambiente,
      fecha_alta: fecha_alta,
      fecha_modificacion: null,
      fecha_baja: null,
    });

    await link.save();

    const response = {
      flagError: "N",
      mensaje: "Link guardado exitosamente",
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ flagError: "S", mensaje: "Error al momento de guardar" });
  }
});


router.put("/api/updateLink/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nombre, url, ambiente } = req.body;
  const fecha_modificacion=date.formatDate(new Date());
  
  try {
    const link = await Link.findByIdAndUpdate(
      id,
      { nombre, url, ambiente, fecha_modificacion},
      { new: true }
    );

    if (!link) {
      return res
        .status(404)
        .send({ flagError: "S", mensaje: "No existe el ID proporcionado" });
    }

    const response = {
      flagError: "N",
      mensaje: "Link actualizado correctamente",
    };

    res.send(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ flagError: "S", mensaje: "Error al momento de actualizar" });
  }
});

router.delete("/api/deleteLink/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await Link.deleteOne({ _id: id });

    if (resp.deletedCount !== 1) {
      return res
        .status(404)
        .send({ flagError: "S", mensaje: "No existe el ID proporcionado" });
    } else {
      const response = {
        flagError: "N",
        mensaje: "Link eliminado correctamente",
      };
      res.send(response);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ flagError: "S", mensaje: "Error al momento de eliminar" });
  }
});

module.exports = router;
