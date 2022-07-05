package RVA.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import RVA.model.Proizvodjac;

public interface ProizvodjacRepository extends JpaRepository<Proizvodjac, Integer> {

	Collection<Proizvodjac> findByNazivContainingIgnoreCase(String naziv);

}
