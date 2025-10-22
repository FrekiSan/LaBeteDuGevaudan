<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250901170425 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE game_session (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, player_name VARCHAR(50) NOT NULL, status VARCHAR(20) NOT NULL, started_at DATETIME NOT NULL --(DC2Type:datetime_immutable)
        , finished_at DATETIME DEFAULT NULL --(DC2Type:datetime_immutable)
        , total_time_sec INTEGER DEFAULT NULL)');
        $this->addSql('CREATE INDEX idx_session_status ON game_session (status)');
        $this->addSql('CREATE INDEX idx_session_finished ON game_session (finished_at)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE game_session');
    }
}
