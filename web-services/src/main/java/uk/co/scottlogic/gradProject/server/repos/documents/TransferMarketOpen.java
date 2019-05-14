package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

import static uk.co.scottlogic.gradProject.server.misc.Regex.COLLEGE_NAME_PATTERN;

@Entity
@Table()
public class TransferMarketOpen {

    private Boolean isOpen;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public TransferMarketOpen(boolean isOpen) {
        this.isOpen = isOpen;
        this.id = UUID.randomUUID();
    }

    public TransferMarketOpen() {
    }

    public Boolean getOpen() {
        return isOpen;
    }

    public void setOpen(Boolean open) {
        isOpen = open;
    }
}
