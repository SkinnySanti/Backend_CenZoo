package CenZoo.back_end.especies.service;

import CenZoo.back_end.especies.model.Especie;

import java.util.List;
import java.util.Optional;

public interface IServiceExpecies{
    List<Especie> listarEspecies();
    Optional<Especie> buscarEspeciePorId(Integer id);
    Especie agregarEspecie(Especie especie);
    void eliminarEspecie(Integer id);
}
