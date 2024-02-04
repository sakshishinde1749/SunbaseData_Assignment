package sunbasedata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sunbasedata.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);
    Customer findByFirstName(String firstName);

    Customer findByLastName(String lastName);

}
