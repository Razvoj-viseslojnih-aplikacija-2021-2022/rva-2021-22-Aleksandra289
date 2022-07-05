package RVA.ctrl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import RVA.model.Proizvod;
import RVA.model.Proizvodjac;
import RVA.model.Racun;
import RVA.model.StavkaRacuna;
import RVA.repository.ProizvodRepository;
import RVA.repository.ProizvodjacRepository;
import RVA.repository.RacunRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
@Api(tags= {"CRUD operations on Racun table"})
public class ProizvodController {

	@Autowired
	private ProizvodRepository proizvodRepository;
	
	@Autowired
	private ProizvodjacRepository proizvodjacRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/proizvod")
	@ApiOperation(value= "Returns all rows from the Proizvod table")
	public Collection<Proizvod> getAllProizvod(){
		return proizvodRepository.findAll();
	}
	
	@GetMapping("/proizvod/{id}")
	@ApiOperation(value= "Returns row with specific id from the Proizvod table")
	public Proizvod getProizvodById(@PathVariable int id) 
	{
			return proizvodRepository.getById(id);
	}

	@GetMapping ("/proizvod/proizvodjac/{proizvodjac}")
	@ApiOperation(value= "Returns row with specific producer (proizvodjac) from the Proizvod table")
	public Collection<Proizvod> getProizvodByProizvodjac(@PathVariable int proizvodjac)
	{
		Proizvodjac temp= proizvodjacRepository.getById(proizvodjac);
		return proizvodRepository.findByProizvodjac(temp);
	}
	
	@PostMapping("/proizvod")
	@ApiOperation(value= "Creates new row in Proizvod table")
	public ResponseEntity<Proizvod> createProizvod(@RequestBody Proizvod proizvod)
	{
		if(!proizvodRepository.existsById(proizvod.getId())) 
		{
			Proizvod temp = proizvodRepository.save(proizvod);
			return new ResponseEntity<Proizvod> (temp, HttpStatus.CREATED);
		}
		else 
		{
			return new ResponseEntity<Proizvod> (HttpStatus.CONFLICT);
		}
		
	}
	
	@PutMapping("/proizvod")
	@ApiOperation(value= "Updates row in Proizvod table")
	public ResponseEntity<Proizvod> updateProizvod (@RequestBody Proizvod proizvod)
	{
		if(proizvodRepository.existsById(proizvod.getId())) 
		{
			proizvodRepository.save(proizvod);
			return new ResponseEntity<Proizvod> (HttpStatus.OK);
		}
		else 
		{
			return new ResponseEntity<Proizvod> (HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping("/proizvod/{id}")
	@ApiOperation(value= "Deletes row in Proizvod table")
	public ResponseEntity <Proizvod> deleteProizvod (@PathVariable int id)
	{
		if (proizvodRepository.existsById(id)) 
		{
			proizvodRepository.deleteById(id);
			if (id==-100) 
			{
				
				jdbcTemplate.execute("Insert into  \"proizvod\"values (-100, 'Figaro', '1')");
				
			}
			return new ResponseEntity <Proizvod> (HttpStatus.OK);
		}
			else 
			{
				
				return new ResponseEntity<Proizvod>(HttpStatus.NOT_FOUND);
			}
		
		
	}
	
	
	
}
