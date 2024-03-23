package com.example.boil;

import com.example.boil.cpm.CPM;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BoilApplication {

	public static void main(String[] args) {
		CPM cpm = new CPM();
		for (int i = 1; i < 10; i++) {
			cpm.addEvent(String.valueOf(i));
		}
		cpm.addActivity("A",3,"1","2");
		cpm.addActivity("B",4,"2","3");
		cpm.addActivity("C",6,"2","4");
		cpm.addActivity("D",7,"3","5");
		cpm.addActivity("E",1,"5","7");
		cpm.addActivity("F",2,"4","7");
		cpm.addActivity("G",3,"4","6");
		cpm.addActivity("H",4,"6","7");
		cpm.addActivity("I",1,"7","8");
		cpm.addActivity("J",2,"8","9");
		cpm.solve();
		SpringApplication.run(BoilApplication.class, args);
	}

}
