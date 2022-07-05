package RVA.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import RVA.model.Proizvod;
import RVA.model.Proizvodjac;

public interface ProizvodRepository extends JpaRepository<Proizvod, Integer> {


	Collection<Proizvod> findByProizvodjac(Proizvodjac temp);

	

}
