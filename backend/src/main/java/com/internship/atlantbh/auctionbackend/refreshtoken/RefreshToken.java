package com.internship.atlantbh.auctionbackend.refreshtoken;

import com.internship.atlantbh.auctionbackend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "refresh_token", schema = "dev")
public class RefreshToken {

        @Id
        @GeneratedValue
        private UUID id;

        @OneToOne
        @JoinColumn(name = "user_id", referencedColumnName = "id")
        private User user;

        @Column(name = "token", nullable = false, unique = true)
        private UUID token;

        @Column(name = "expiry_date" , nullable = false)
        private Timestamp expiryDate;

        public UUID getId() {
                return id;
        }

        public void setId(final UUID id) {
                this.id = id;
        }

        public User getUser() {
                return user;
        }

        public void setUser(final User user) {
                this.user = user;
        }

        public UUID getToken() {
                return token;
        }

        public void setToken(final UUID token) {
                this.token = token;
        }

        public Timestamp getExpiryDate() {
                return expiryDate;
        }

        public void setExpiryDate(final Timestamp expiryDate) {
                this.expiryDate = expiryDate;
        }

        @Override
        public String toString() {
                return "RefreshToken{" +
                        "id=" + id +
                        ", user=" + user +
                        ", token='" + token + '\'' +
                        ", expiryDate=" + expiryDate +
                        '}';
        }
}
