module.exports = function discord(token, PREFIX) {
    const Discord = require('discord.js')
    const client = new Discord.Client()

    client.once('ready', () => {
            console.log('Bot is online!')
    })

    if (PREFIX === undefined) {
            throw new TypeError('you must provide a prefix for your bot')
    }

    client.on('message', async message => {
            const args = message.content.slice(PREFIX.length).trim().split(/ +/)
            const command = args.shift().toLowerCase()

            if (command === 'ping') {
                    message.channel.send({
                        embed:{
                            color:'GREEN',
                            description:`\`${client.ws.ping}ms\` Pong!`
                        }
                    })
            }
            if (command === 'kick') {
                    message.delete();
                    if (!message.member.hasPermission("KICK_MEMBERS"))
                            return message.channel.send({
                                embed:{
                                    color:'RED',
                                    description:`You Don't Have Permission To Use This Command!`
                                }
                            })

                    let Member = message.mentions.users.first();

                    if (!Member)
                            return message.channel.send({
                                embed:{
                                    color:'RED',
                                    description:`Please Mention A Member That You Want To Kick!`
                                }
                            })

                    if (!message.guild.members.cache.get(Member.id))
                            return message.channel.send({
                                embed:{
                                    color:'RED',
                                    description:`Please Mention A Valid Member!`
                                }
                            });

                    if (Member.id === message.author.id)
                            return message.channel.send({
                                embed:{
                                    color:'RED',
                                    description:`You Can't Kick Your Self!`
                                }
                            });

                    if (Member.id === client.user.id)
                            return message.channel.send({
                                embed:{
                                    color:'RED',
                                    description:`Please Don't Kick Me ;-;`
                                }
                            });

                    if (Member.id === message.guild.owner.user.id)
                            return message.channel.send({
                                embed:{
                                    color:'RED',
                                    description:`You Can't Kick Owner Of Server!`
                                }
                            });

                    let Reason = args.slice(1).join(" ");

                    let User = message.guild.member(Member);

                    if (!User.kickable)
                            return message.channel.send({
                                embed:{
                                    color:'RED',
                                    description:`I Can't Kick That Member!`
                                }
                            });

                    try {

                            setTimeout(function() {
                                    User.kick({ reason: `${Reason || "No Reason Provided!"}` });
                            }, 2000);
                            let embed = new Discord.MessageEmbed()
                                    .setColor('YELLOW')
                                    .setTitle(`Member Kicked!`)
                                    .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
                                    .addField(`Kicked Member`, `${Member.tag} (${Member.id})`)
                                    .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
                                    .setFooter(`Requested by ${message.author.username}`)
                                    .setTimestamp();
                            if (User && Member.bot === false)
                                    Member.send(
                                            `You Have Been Kicked From **${message.guild.name}** For ${Reason ||
                                            "No Reason Provided!"}`
                                    );
                            message.channel.send(embed);
                    } catch (error) {
                            return message.channel
                                    .send({
                                        embed:{
                                            color:'RED',
                                            description:`I Can't Kick That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`
                                        }
                                    })
                                    .then(() => console.log(error));
                    }
            }
            if (command === 'ban') {
                message.delete();
                if (!message.member.hasPermission("BAN_MEMBERS"))
                        return message.channel.send({
                            embed:{
                                color:'RED',
                                description:`You Don't Have Permission To Use This Command!`
                            }
                        })
        
                let Member = message.mentions.users.first();
        
                if (!Member)
                        return message.channel.send({
                            embed:{
                                color:'RED',
                                description:`Please Mention A Member That You Want To Ban!`
                            }
                        })
        
                if (!message.guild.members.cache.get(Member.id))
                        return message.channel.send({
                            embed:{
                                color:'RED',
                                description:`Please Mention A Valid Member!`
                            }
                        });
        
                if (Member.id === message.author.id)
                        return message.channel.send({
                            embed:{
                                color:'RED',
                                description:`You Can't Ban Your Self!`
                            }
                        });
        
                if (Member.id === client.user.id)
                        return message.channel.send({
                            embed:{
                                color:'RED',
                                description:`Please Don't Ban Me ;-;`
                            }
                        });
        
                if (Member.id === message.guild.owner.user.id)
                        return message.channel.send({
                            embed:{
                                color:'RED',
                                description:`You Can't Ban Owner Of Server!`
                            }
                        });
        
                let Reason = args.slice(1).join(" ");
        
                let User = message.guild.member(Member);
        
                if (!User.bannable) return message.channel.send({
                    embed:{
                        color:'RED',
                        description:`I Can't Ban That Member!`
                    }
                });
        
                try {
                        setTimeout(function() {
                                User.ban({ reason: `${Reason || "No Reason Provided!"}` });
                        }, 2000);
                        let embed = new Discord.MessageEmbed()
                                .setColor('YELLOW')
                                .setTitle(`Member Banned!`)
                                .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
                                .addField(`Banned Member`, `${Member.tag} (${Member.id})`)
                                .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
                                .setFooter(`Requested by ${message.author.username}`)
                                .setTimestamp();
                        if (User && Member.bot === false)
                                Member.send(
                                        `You Have Been Banned From **${message.guild.name}** For ${Reason ||
                                        "No Reason Provided!"}`
                                );
                        message.channel.send(embed);
                } catch (error) {
                        return message.channel
                                .send({
                                    embed:{
                                        color:'RED',
                                        description:`I Can't Ban That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`
                                    }
                                })
                                .then(() => console.log(error));
                }
        }
        if (command === 'clear') {
            message.delete();
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
                    return message.channel.send({
                        embed:{
                            color:'RED',
                            description:"You Don't Have Permission To Use This Command!"
                        }
                    })
    
            if (!args[0])
                    return message.channel.send({
                        embed:{
                            color:'RED',
                            description:`Please Give Me Amounts Of Messages!`
                        }
                    });
    
            if (isNaN(args[0]))
                    return message.channel.send({
                        embed:{
                            color:'RED',
                            description:`Please Give Me Number Value!`
                        }
                    });
    
            if (args[0] < 1)
                    return message.channel.send({
                        embed:{
                            color:'RED',
                            description:`You Can Delete ${args[0]} By Your Self Its Not Too Many Messages!`
                        }
                    })
    
            if (args[0] > 100)
                    return message.channel.send({
                        embed:{
                            color:'RED',
                            description:`I Can't Delete ${args[0]} Because Of Discord Limit!`
                        }
                    })
    
            let Reason = args.slice(1).join(" ") || "No Reason Provided!";
    
            message.channel.bulkDelete(args[0]).then(Message => {
                    let embed = new Discord.MessageEmbed()
                            .setColor('YELLOW')
                            .setTitle(`Messages Deleted!`)
                            .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
                            .addField(`Channel`, `${message.channel.name} (${message.channel.id})`)
                            .addField(`Deleted Messages`, `${Message.size}`)
                            .addField(`Reason`, `${Reason}`)
                            .setFooter(`Requested by ${message.author.username}`)
                            .setTimestamp();
                    return message.channel
                            .send(embed)
                            .then(msg => msg.delete({ timeout: 10000 }));
            });
    }
    if (command === 'mute') {
        message.delete();

        let Member =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);

        if (!Member) return message.channel.send({
            embed:{
                color:'RED',
                description:`Please Mention A User!`
            }
        });

        let Role = message.guild.roles.cache.find(role => role.name === "Muted");

        if (!Role)
                return message.channel.send({
                    embed:{
                        color:'RED',
                        description:`Please Create Mute Role | Role Name : Muted`
                    }
                })

        if (Member.roles.cache.has(Role)) {
                return message.channel.send({
                    embed:{
                        color:'RED',
                        description:`Member Is Already Muted!`
                    }
                });
        }

        let Reason = args.slice(1).join(" ");

        let Embed = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setTitle(`Member Muted!`)
                .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
                .addField(`Muted Member`, `${Member.user.tag} (${Member.user.id})`)
                .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
                .setFooter(`Requested by ${message.author.username}`)
                .setTimestamp();

        if (Role && !Member.roles.cache.has(Role)) {
                Member.roles.add([Role]);
                return message.channel.send(Embed);
        } else {
                return message.channel.send({
                    embed:{
                        color:'RED',
                        description:`Something Went Wrong, Try Again Later!`
                    }
                });
        }
}
if (command === 'unban') {
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`You Don't Have Permission To Use This Command!`
                }
            })

    if (!args[0])
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`Please Give Me Member ID That You Want To Unban!`
                }
            })

    if (isNaN(args[0])) return message.channel.send({
        embed:{
            color:'RED',
            description:`Please Give Me Valid ID!`
        }
    });

    if (args[0] === message.author.id)
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`You Are Already Unban!`
                }
            });

    if (args[0] === message.guild.owner.user.id)
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`Server Owner Is Already Unban!`
                }
            });

    if (args[0] === client.user.id)
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`I Am Already Unban!`
                }
            });

    let FetchBan = await message.guild.fetchBans();

    let Member;
    Member =
            FetchBan.find(
                    b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
            ) ||
            FetchBan.get(args[0]) ||
            FetchBan.find(
                    bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
            );

    if (!Member)
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:"Please Give Valid Member ID Or Member Is Not Banned!"
                }
            })

    let Reason = args.slice(1).join(" ") || "No Reason Provided!";

    try {
            message.guild.members.unban(Member.user.id, Reason);
    } catch (error) {
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`I Can't Unban That Member Maybe Member Is Not Banned Or Some Error!`
                }
            })
    }

    let embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`Member Unbanned!`)
            .addField(`Moderator`, `${message.author.tag} (${message.author.id}}`)
            .addField(`Unbanned Member`, `${Member.user.tag} (${Member.user.id})`)
            .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp();

    return message.channel.send(embed);
 }
 if (command === 'unmute') {
    message.delete();

    let Member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send({
        embed:{
            color:'RED',
            description:`Please Mention A User!`
        }
    });

    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;

    if (!Role)
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`There Is No Mute Role, So Member Is Not Muted Anymore!`
                }
            })

    if (!Member.roles.cache.has(Role)) {
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`Member Is Already Unmuted!`
                }
            });
    }

    let Embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`Member Unmuted!`)
            .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
            .addField(`Unmuted Member`, `${Member.user.tag} (${Member.user.id})`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp();

    if (Role && Member.roles.cache.has(Role)) {
            Member.roles.remove([Role]);
            return message.channel.send(Embed);
    } else {
            return message.channel.send({
                embed:{
                    color:'RED',
                    description:`Something Went Wrong, Try Again Later!`
                }
            });
    }
}
    })
    if (token === undefined) {
            throw new TypeError('you must provide your bot TOKEN')
    } else {
            client.login(token)
    }
}