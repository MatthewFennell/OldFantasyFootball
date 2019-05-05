package uk.co.scottlogic.gradProject.server.routers.dto;

public class SingleHistoryDTO {

    private String firstname;
    private String surname;
    private Integer amount;

    public SingleHistoryDTO(String firstname, String surname, Integer amount) {
        this.firstname = firstname;
        this.surname = surname;
        this.amount = amount;
    }

    public SingleHistoryDTO() {
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
